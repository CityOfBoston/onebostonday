<?php
namespace Craft;

class FieldManagerService extends BaseApplicationComponent
{
    // Public Methods
    // =========================================================================

    public function isCpSectionEnabled()
    {
        $settings = craft()->plugins->getPlugin('fieldManager')->getSettings();
        return isset( $settings[ 'cpSectionEnabled' ] ) && $settings[ 'cpSectionEnabled' ];
    }

    public function saveField($field, $originField)
    {
        // If this is a Matrix or Super Table field, we need to do some pre-processing.
        // Because we're essentially editing a current field, we need to remove ID's for blocks and inner fields.
        // Not doing this will move all fields from one Matrix to another - instead of creating new ones.
        if ($field->type == 'Matrix') {
            $field->settings = craft()->fieldManager->processMatrix($field);
        }

        if ($field->type == 'SuperTable') {
            $field->settings = craft()->fieldManager->processSuperTable($field);
        }

        // Send off to Craft's native fieldSave service for heavy lifting.
        if (craft()->fields->saveField($field)) {
            FieldManagerPlugin::log($field->name . ' cloned successfully.');
            return true;
        } else {
            FieldManagerPlugin::log('Could not clone ' . $field->name . ' - ' . print_r($field->getErrors(), true), LogLevel::Error);
            return false;
        }
    }

    public function saveGroup($group, $prefix, $originGroup)
    {
        if (craft()->fields->saveGroup($group)) {
            $errors = array();

            foreach (craft()->fields->getFieldsByGroupId($originGroup->id) as $originField) {
                $field = new FieldModel();
                $field->groupId = $group->id;
                $field->name = $originField->name;
                $field->handle = $prefix . $originField->handle;
                $field->required = $originField->required;
                $field->instructions = $originField->instructions;
                $field->translatable = $originField->translatable;
                $field->type = $originField->type;
                $field->settings = $originField->settings;

                if (!craft()->fieldManager->saveField($field, $originField)) {
                    $errors[] = $field;
                }
            }

            if ($errors) {
                foreach ($errors as $error) {
                    FieldManagerPlugin::log('Could not clone ' . $error->name . ' in ' . $originGroup->name . ' group - ' . print_r($group->getErrors(), true), LogLevel::Error);
                }

                return false;
            } else {
                FieldManagerPlugin::log($originGroup->name . ' group cloned successfully.');
                return true;
            }
        } else {
            FieldManagerPlugin::log('Could not clone ' . $originGroup->name . ' group - ' . print_r($group->getErrors(), true), LogLevel::Error);
            return false;
        }
    }

    public function getUnusedFieldIds() 
    {
        // All fields
        $query = craft()->db->createCommand();
        $allFieldIds = $query
            ->select(craft()->db->tablePrefix . 'fields.id')
            ->from('fields')
            ->order(craft()->db->tablePrefix . 'fields.id')
            ->queryColumn();
        
        // Fields in-use
        $query = craft()->db->createCommand();
        $query->distinct = true;
        $usedFieldIds = $query
            ->select(craft()->db->tablePrefix . 'fieldlayoutfields.fieldId')
            ->from('fieldlayoutfields')
            ->order(craft()->db->tablePrefix . 'fieldlayoutfields.fieldId')
            ->queryColumn();

        // Get only the unused fields
        return array_diff($allFieldIds, $usedFieldIds);
    }

    public function processMatrix($field)
    {
        $fieldSettings = $field->settings;

        // Strip out all the IDs from the origin field
        foreach ($fieldSettings->blockTypes as $blockType) {
            $blockType->id = null;

            foreach ($blockType->fields as $blockField) {
                $blockField->id = null;

                // Case for nested Super Table
                if ($blockField->type == 'SuperTable') {
                    // Ensure FieldTypes have a chance to prepare their settings properly
                    $blockField->settings = $blockField->fieldType->prepSettings($blockField->settings);

                    $blockField->settings = craft()->fieldManager->processSuperTable($blockField);
                }
            }
        }

        return $fieldSettings;
    }

    public function processSuperTable($field)
    {
        $fieldSettings = $field->settings;

        // Strip out all the IDs from the origin field
        foreach ($fieldSettings->blockTypes as $blockType) {
            $blockType->id = null;

            foreach ($blockType->fields as $blockField) {
                $blockField->id = null;

                // Case for nested Matrix
                if ($blockField->type == 'Matrix') {
                    // Ensure FieldTypes have a chance to prepare their settings properly
                    $blockField->settings = $blockField->fieldType->prepSettings($blockField->settings);

                    $blockField->settings = craft()->fieldManager->processMatrix($blockField);
                }
            }
        }

        return $fieldSettings;
    }
}
