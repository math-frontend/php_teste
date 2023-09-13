Cmp.RelRastreamento = function() {
    
    var private = {

        render: function() {

            // placa
            Cmp.createInput({
                id: 'inputPlaca',
                renderTo: '#divInputPlaca',
                label: 'Placa do veículo',
                width: '200px'
            });

            // Nome do funcionario
            Cmp.createInput({
                id: 'inputFuncionario',
                renderTo: '#divInputFuncionario',
                label: 'Funcionario do veículo',
                width: '200px'
            });

            Cmp.createButton({
                id: 'btnBuscar',
                renderTo: '#divBtnConsultar',
                text: 'Buscar',
                handler: function() {
                    private.buscar();
                }
            });

            Cmp.createGrid({
                id: 'gridDadosVeiculos',
                renderTo: '#divCmpGridVeiculo',
                header: [
                    {
                        text: 'Placa',
                        field: 'VehiclePlate'
                    }, 
                    {
                        text: 'Funcionario',
                        field: 'EmployeeName'
                    }, 
                    {
                        text: 'Data',
                        field: 'IncidentDate'
                    }, 
                    {
                        text: 'Vel. Max.',
                        field: 'MaxSpeed'
                    }, 
                    {
                        text: 'Vel. Reg.',
                        field: 'RecordedSpeed'
                    }, {
                        text: 'Dif. Vel',
                        field: 'SpeedDifferencePercentage'
                    }, {
                        text: 'Latitude',
                        field: 'Latitude',
                        width: 150
                    }, {
                        text: 'Longitude',
                        field: 'Longitude',
                        width: 150
                    }
                ]
            });
        },

        buscar: function() {
            Cmp.showLoading();

            Cmp.request({
                url: 'index.php?mdl=relRastreamento&file=ds_rastreamento.php',
                params: {
                    VehiclePlate: Cmp.get('inputPlaca').getValue(),
                    EmployeeName: Cmp.get('inputFuncionario').getValue()
                },
                success: function(res) {
                    Cmp.hideLoading();
                    if(res.status == 'success') {
                        Cmp.get('gridDadosVeiculos').loadData(res.data);
                    } else {
                        Cmp.showErrorMessage(res.message || 'Ocorreu um erro na requisição');
                    }
                }
            });
        }

    };

    this.init = function() {
        private.render();
        private.buscar()
    }

}