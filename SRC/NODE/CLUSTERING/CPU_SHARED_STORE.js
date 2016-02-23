/**
 * CPU clustering shared store class
 */
global.CPU_SHARED_STORE = CLASS(function(cls) {
	'use strict';

	var
	// storages
	storages = {},

	// remove delay map
	removeDelayMap = {},

	// save.
	save,

	// get.
	get,
	
	// list.
	list,

	// remove.
	remove;

	cls.save = save = function(params, remove) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.name
		//REQUIRED: params.value
		//OPTIONAL: params.removeAfterSeconds
		//OPTIONAL: remove

		var
		// store name
		storeName = params.storeName,

		// name
		name = params.name,

		// value
		value = params.value,

		// remove after seconds
		removeAfterSeconds = params.removeAfterSeconds,
		
		// storage
		storage = storages[storeName],
		
		// remove delays
		removeDelays = removeDelayMap[storeName];
		
		if (storage === undefined) {
			storage = storages[storeName] = {};
		}

		storage[name] = value;

		if (removeDelays === undefined) {
			removeDelays = removeDelayMap[storeName] = {};
		}

		if (removeDelays[name] !== undefined) {
			removeDelays[name].remove();
			delete removeDelays[name];
		}

		if (removeAfterSeconds !== undefined) {
			removeDelays[name] = DELAY(removeAfterSeconds, remove);
		}
	};

	cls.get = get = function(params) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.name
		
		var
		// store name
		storeName = params.storeName,
		
		// name
		name = params.name,
		
		// storage
		storage = storages[storeName];
		
		if (storage !== undefined) {
			return storage[name];
		}
	};
	
	cls.list = list = function(storeName) {
		//REQUIRED: storeName
		
		var
		// storage
		storage = storages[storeName];
		
		return storage === undefined ? {} : storage;
	};

	cls.remove = remove = function(params) {
		//REQUIRED: params
		//REQUIRED: params.storeName
		//REQUIRED: params.name
		
		var
		// store name
		storeName = params.storeName,
		
		// name
		name = params.name,
		
		// storage
		storage = storages[storeName],
		
		// remove delays
		removeDelays = removeDelayMap[storeName];
		
		if (storage !== undefined) {
			delete storage[name];
		}

		if (removeDelays !== undefined && removeDelays[name] !== undefined) {
			removeDelays[name].remove();
			delete removeDelays[name];
		}
	};

	return {

		init : function(inner, self, storeName) {
			//REQUIRED: storeName

			var
			// save.
			save,

			// get.
			get,
			
			// list.
			list,

			// remove.
			remove;

			self.save = save = function(params) {
				//REQUIRED: params
				//REQUIRED: params.name
				//REQUIRED: params.value
				//OPTIONAL: params.removeAfterSeconds

				var
				// name
				name = params.name,

				// value
				value = params.value,

				// remove after seconds
				removeAfterSeconds = params.removeAfterSeconds;

				cls.save({
					storeName : storeName,
					name : name,
					value : value,
					removeAfterSeconds : removeAfterSeconds
				}, function() {
					remove(name);
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_STORE_SAVE',
						data : {
							storeName : storeName,
							name : name,
							value : value
						}
					});
				}
			};

			self.get = get = function(name, callback) {
				//REQUIRED: name
				//OPTIONAL: callback
				
				var
				// data
				data = cls.get({
					storeName : storeName,
					name : name
				});
				
				if (callback !== undefined) {
					callback(data);
				}

				return data;
			};
			
			self.list = list = function(callback) {
				//OPTIONAL: callback
				
				var
				// data set
				dataSet = cls.list(storeName);
				
				if (callback !== undefined) {
					callback(dataSet);
				}
				
				return dataSet;
			};

			self.remove = remove = function(name) {
				//REQUIRED: name

				cls.remove({
					storeName : storeName,
					name : name
				});

				if (CPU_CLUSTERING.broadcast !== undefined) {

					CPU_CLUSTERING.broadcast({
						methodName : '__CPU_SHARED_STORE_REMOVE',
						data : {
							storeName : storeName,
							name : name
						}
					});
				}
			};
		}
	};
});

FOR_BOX(function(box) {
	'use strict';

	box.CPU_SHARED_STORE = CLASS({

		init : function(inner, self, name) {
			//REQUIRED: name

			var
			// shared store
			sharedStore = CPU_SHARED_STORE(box.boxName + '.' + name),

			// save.
			save,

			// get.
			get,
			
			// list.
			list,

			// remove.
			remove;

			self.save = save = sharedStore.save;

			self.get = get = sharedStore.get;
			
			self.list = list = sharedStore.list;

			self.remove = remove = sharedStore.remove;
		}
	});
});
