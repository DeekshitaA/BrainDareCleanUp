(function(){
  angular.module('brainDare')

    .controller('DareAddCtrl', function($scope, brainDareService){

      this.remindMeOptions = [
        {id:'1', name: '15 minutes'},
        {id:'2', name:'1 hour'},
        {id:'3', name:'day'},
        {id:'4', name:'15 days'},
      ];

      this.remindSelected = this.remindMeOptions[0];


      this.showDatePicker = function(kind, $event) {
        var options = {
          date: new Date(),
          mode: 'datetime', // 'date' or 'time'
          minDate: new Date(),
          allowOldDates: false,
          allowFutureDates: true,
          doneButtonLabel: 'DONE',
          // doneButtonColor: '#F2F3F4',
          cancelButtonLabel: 'CANCEL',
          //  cancelButtonColor: '#000000'
        };

        datePicker.show(options, function(date){
          if(date != 'Invalid Date') {
            $scope.complete = date;
            console.log('this.completeDate',  $scope.complete);
          } else {
            console.log(date);
          }
        });
        $event.stopPropagation();


      };

      this.user = brainDareService.getUser();

      this.currentItem = null;

      this.items = brainDareService.getItems();

      this.addDare = function () {
        this.completeDate = $scope.complete;
        console.log('complete Date before Add', this.completeDate);
        this.newItem = {
          by: this.user.uid,
          taskName: this.taskName,
          taskDescr: this.taskDescr,
          completeDate: this.completeDate.getTime(),
          remindDate: this.remindSelected.name,
          type:'self'
        };
        console.log('complete Date on Add', this.completeDate);
        brainDareService.addItem(angular.copy(this.newItem));

      };

      this.updateItem = function (id) {
        brainDareService.updateItem(id);
      };

      this.removeItem = function (id) {
        brainDareService.removeItem(id);
      };
    })



}());
