<?php

/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */

return array(

	// The database server name or IP address. Usually this is 'localhost' or '127.0.0.1'.
	'server' => getenv('DB_HOST'),

	// The name of the database to select.
	'database' => getenv('DB_NAME'),

	// The database username to connect with.
	'user' => getenv('DB_USER'),

	// The database password to connect with.
	'password' => getenv('DB_PASS'),
	
	'initSQLs' => array("SET SESSION sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';"),

	// The prefix to use when naming tables. This can be no more than 5 characters.
	'tablePrefix' => 'obd',

);
