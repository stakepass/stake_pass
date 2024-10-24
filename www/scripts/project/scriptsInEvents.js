


const scriptsInEvents = {

	async EventSheet1_Event2_Act1(runtime, localVars)
	{
		const html5QrCode = new Html5Qrcode("reader", /* verbose= */ true);
		
		Html5Qrcode.getCameras().then(devices => {
		  /**
		   * devices would be an array of objects of type:
		   * { id: "id", label: "label" }
		   */
		  if (devices && devices.length) {
			//alert(runtime.globalVars.Variable1);
		    var divaceId = runtime.globalVars.Variable1;
			//alert(runtime.globalVars.Variable1);
			//console.log(divaceId);
			//console.log(devices[divaceId].id);
		    var cameraId = devices[divaceId].id;
			runtime.callFunction("requestCamer");
		    const html5QrCode = new Html5Qrcode(/* element id */ "reader");
		html5QrCode.start(
		  cameraId, 
		  {
		    fps: 10,    // Optional, frame per seconds for qr code scanning
			//aspectRatio: 9.16,
			
		    //qrbox: { width: 250, height: 250 },
			facingMode: { exact: "environment"}
		  // Optional, if you want bounded box UI
		  },
		  (decodedText, decodedResult) => {
		    console.log(decodedText);
			console.log(decodedResult);
			runtime.callFunction("viewBlock", [String(decodedText)]);
			//parent.c3_callFunction("stop");
		  },
		  (errorMessage) => {
		    //alert(errorMessage);
		  })
		.catch((err) => {
		  //alert(err);
		});
		  }
		}).catch(err => {
		  	alert(err);
			console.log(err);
		});
		
	},

	async EventSheet1_Event4_Act2(runtime, localVars)
	{
			html5QrCode.stop().then((ignore) => {
		  // QR Code scanning is stopped.
			}).catch((err) => {
		  // Stop failed, handle it.
			});
	},

	async EventSheet2_Event6_Act2(runtime, localVars)
	{
		var cells = document.querySelectorAll('.resultstable tr.Item');
		
		// Преобразуем NodeList в массив для удобства
		cells = Array.prototype.slice.call(cells);
		
		// Функция обработки клика
		cells.forEach(function(cell) {
		  cell.addEventListener('click', function() {
		    // Убираем выделение с других ячеек
		    cells.forEach(function(c) {
		      c.classList.remove('selected');
		    });
		
		    // Добавляем класс выделения к текущей ячейке
		    this.classList.add('selected');
		
		    // Получаем текст ячейки
		    var cellText = this.textContent || this.innerText;
			let result = cellText.split("[")[0];
			let resultID = cellText.match(/\[(.*?)\]/);
		    // Вызываем функцию Construct 3 и передаем текст ячейки
			console.log(result);
			console.log(resultID[0]);
		    runtime.callFunction('OnCellClicked', result, resultID[0]);
		  });
		});
	},

	async EventSheet2_Event10_Act1(runtime, localVars)
	{
		deleteSelectedCell();
		function deleteSelectedCell() {
		  var selectedCell = document.querySelector('.resultstable tr.Item.selected');
		  if (selectedCell) {
		    selectedCell.remove(); // Удаляет выбранную ячейку из DOM
		    // Вызываем функцию Construct 3, если нужно
		    //runtime.callFunction('OnCellDeleted', index);
		  }
		}
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

