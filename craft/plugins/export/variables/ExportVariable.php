<?php

namespace Craft;

class ExportVariable
{
    public function getMySetting($setting = null)
{
    return craft()->export->getMySetting($setting);
}
}
