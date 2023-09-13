<?php

$where = '';

if(!empty($_REQUEST['VehiclePlate'])) {
    $where = "WHERE VehiclePlate LIKE '%{$_REQUEST['VehiclePlate']}%' AND RecordedSpeed > MaxSpeed";
} else {
    $where = "WHERE RecordedSpeed > MaxSpeed";
}

$db = new Database();

if($db->connect()) {

    $dados = $db->sqlQueryArray(
        "SELECT 
            VehiclePlate, 
            EmployeeName, 
            DATE_FORMAT(IncidentDate, '%Y-%m-%d %H:%i:%s') AS FormattedIncidentDate,
            MaxSpeed, 
            RecordedSpeed, 
            CONCAT(ROUND(((RecordedSpeed - MaxSpeed) / MaxSpeed) * 100, 2), '%') AS SpeedDifferencePercentage, 
            Latitude, 
            Longitude 
        FROM trafficincidents {$where}"
    );

    echo json_encode(array(
        'status' => 'success',
        'data' => $dados
    ));

} else {
    echo json_encode(array(
        'status' => 'failure',
        'message' => 'Erro ao conectar ao banco'
    ));
}