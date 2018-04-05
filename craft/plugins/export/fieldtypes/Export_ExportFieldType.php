<?php
namespace Craft;

class Export_ExportFieldType extends BaseFieldType
{
    public function getName()
    {
        return Craft::t('Export Single Landing Page');
    }

    public function getInputHtml($name,$value)
    {
        return craft()->templates->render('export/export', array(
            'name'  => $name,
            'value' => $value
        ));
    }
}