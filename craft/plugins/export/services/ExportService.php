<?php
/**
 * Export plugin for Craft CMS
 *
 * Export Service
 *
 * --snip--
 * All of your plugin’s business logic should go in services, including saving data, retrieving data, etc. They
 * provide APIs that your controllers, template variables, and other plugins can interact with.
 *
 * https://craftcms.com/docs/plugins/services
 * --snip--
 *
 * @author    Hill Holliday
 * @copyright Copyright (c) 2016 Hill Holliday
 * @link      http://hhcc.com
 * @package   Export
 * @since     1.0.0
 */

namespace Craft;

class ExportService extends BaseApplicationComponent
{
    /**
     * This function can literally be anything you want, and you can have as many service functions as you want
     *
     * From any other plugin file, call it like this:
     *
     *     craft()->export->exampleService()
     */

    public function getMySetting($setting = null)
    {
        $plugin = craft()->plugins->getPlugin('export');
        $settings = $plugin->getSettings();

        return $settings->$setting;
    }

}