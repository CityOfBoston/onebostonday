<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(
    '*' => array(
        'omitScriptNameInUrls' => true,
        'useEmailAsUsername' => true,
        'cpTrigger' => 'obd-admin',
        'timezone' => 'America/New_York',
        'autoLoginAfterAccountActivation' => true,
        'postLoginRedirect' => '',
    ),
    '.test' => array(
        'siteUrl' => 'http://one-boston-day.hhcc.test/',
        'devMode' => true,
        'siteName' => 'One Boston Day Dev',
        'requireMatchingUserAgentForSession' => false,
        'cache' => false,
        'environmentVariables' => array(
            'baseUrl'  => 'http://onebostonday.test/',
        ),
    ),
    'staging.onebostonday.org' => array(
        'siteUrl' => 'http://onebostonday.org/',
        'devMode' => true,
        'siteName' => 'One Boston Day',
        'requireMatchingUserAgentForSession' => false,
        'cache' => false,
        'environmentVariables' => array(
            'baseUrl'  => 'http://staging.onebostonday.org/',
        ),
    ),
);
