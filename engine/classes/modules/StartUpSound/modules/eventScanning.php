<?php
if(!defined('startUpSound')) {
    die('{"message": "Not in startUpSound thread"}');
}

class eventScanning extends startUpSound {
    protected $monthNowArray;
    protected $todaysEventArray;

    public function __construct($dayToday, $monthToday) {
        $this->scanEvents($dayToday, $monthToday);
    }

    protected function checkPeriod($key, $value, $dayToday) {
        if (strpos($key, '-') !== false) {
            $datePeriod = explode('-', $key);
            $dayFrom = $datePeriod[0];
            $dayTill = $datePeriod[1];
            if ($dayToday >= $dayFrom && $dayToday <= $dayTill) {
                return $value;
            }
        } else {
            if ($dayToday == $key) {
                return $value;
            }
        }
        return null;
    }

    protected function scanEvents($dayToday, $monthToday) {
        $eventName = 'common';
        if (is_array(startUpSound::$eventsArray)) {
            foreach (startUpSound::$eventsArray as $month => $events) {
                if ($monthToday == $month) {
                    if (is_array($events)) {
                        $this->monthNowArray = $events;
                        foreach ($this->monthNowArray as $key => $value) {
                            $this->todaysEventArray = $this->checkPeriod($key, $value, $dayToday);

                            if (is_array($this->todaysEventArray)) {
                                self::$eventNow = $this->todaysEventArray['eventName'] ?? 'common';
                            } else {
                                switch ($key) {
                                    case 'eventName':
                                        self::$eventNow = $value;
                                        break;

                                    case 'NotAllow':
                                        if (is_array($value)) {
                                            self::$notAllow = $value;
                                        }
                                        break;

                                    default:
                                        $eventName = 'common';
                                        break;
                                }
                            }
                        }
                    } else {
                        //trigger_error("Invalid argument for monthNowArray, expected an array but got " . gettype($events), E_USER_WARNING);
                    }
                }
            }
        } else {
            //trigger_error("Invalid argument for eventsArray, expected an array but got " . gettype(startUpSound::$eventsArray), E_USER_WARNING);
        }
    }
}
