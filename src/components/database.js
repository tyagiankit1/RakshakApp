import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('rakshakCode.db')

const getUsers = (userValue) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from userDetails',
        [],
        (_, { rows: { _array } }) => {
          userValue(_array[0])
        }
      );
    },
    (t, error) => { console.log("db error load users"); console.log(error) },
    (_t, _success) => { console.log("loaded users")}
  );
}

const getVehicle = (vehicleValue) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from vehicalDetails',
        [],
        (_, { rows: { _array } }) => {
          vehicleValue(_array)
        }
      );
    },
    (t, error) => { console.log("db error load vehicle"); console.log(error) },
    (_t, _success) => { console.log("loaded vehicle")}
  );
}

const getMechanic = (mechanicValue) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from mechanicDetails',
        [],
        (_, { rows: { _array } }) => {
          mechanicValue(_array)
        }
      );
    },
    (t, error) => { console.log("db error load mechanic"); console.log(error) },
    (_t, _success) => { console.log("loaded mechanic")}
  );
}

const getUserOrderDetails = (userOrderDetailsValue) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from userOrderDetails',
        [],
        (_, { rows: { _array } }) => {
          userOrderDetailsValue(_array)
        }
      );
    },
    (t, error) => { console.log("db error load users"); console.log(error) },
    (_t, _success) => { console.log("loaded users")}
  );
}

const getUserQRDetails = (userOrderDetailsValue) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from qrCodeDetails',
        [],
        (_, { rows: { _array } }) => {
          userOrderDetailsValue(_array)
        }
      );
    },
    (t, error) => { console.log("db error load users"); console.log(error) },
    (_t, _success) => { console.log("loaded users")}
  );
}

const getFuelDetails = (fuelDetailsValue) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'select * from fuelDetails',
        [],
        (_, { rows: { _array } }) => {
          fuelDetailsValue(_array)
        }
      );
    },
    (t, error) => { console.log("db error load fuelDetails"); console.log(error) },
    (_t, _success) => { console.log("loaded fuelDetails")}
  );
}

const insertUser = (payload, successFunc) => {

  db.transaction( tx => {
    tx.executeSql( 'insert into userDetails ("userID", picture, "name", "contactNo", email, address, city, state, pincode, "refCode", "refByCode", "createdAt", "updatedAt") values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [payload.userID, payload.picture, payload.name, payload.contactNo, payload.email, payload.address, payload.city, payload.state, payload.pincode, payload.refCode, payload.refByCode, payload.createdAt, payload.updatedAt] );  
  },
    (t, error) => { console.log("db error insertUser"); console.log(t, error);},
    (t, success) => { console.log("save user data"); successFunc() }
  )
}

const updateUser = (payload, successFunc) => {
  db.transaction( tx => {
    tx.executeSql( 'UPDATE "userDetails" SET picture='+payload.picture+', "name"="'+payload.name+'", "contactNo"="'+payload.contactNo+'", email="'+payload.email+'", address="'+payload.address+'", city="'+payload.city+'", state="'+payload.state+'", pincode='+payload.pincode+' WHERE "userID"="'+ payload.userID+'";' );
    // tx.executeSql( 'UPDATE user_details SET "name"='+payload.name+', email='+payload.email+', city='+payload.city+', address='+payload.address+', state='+payload.state+', contact='+payload.contact+', pin_code='+payload.pin_code+' WHERE user_id='+payload.user_id );  
  },
    (t, error) => { console.log("db error updateUser"); console.log(t, error);},
    (t, success) => { successFunc() }
  )
}

const insertVehicle = (payload, successFunc) => {
  db.transaction( tx => {
      tx.executeSql( 'insert into vehicalDetails ("vehicleID", "userID", "regNumber", "owner", brand, model, "fuelType", "vehType", "transmissionType", "insuranceNumber", "insuranceExpire", "pollutionNumber", "pollutionExpire", vehStatus, qrStatus, "createdAt", "updatedAt") values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [payload.vehicleID, payload.userID, payload.regNumber, payload.owner, payload.brand, payload.model, payload.fuelType, payload.vehType, payload.transmissionType, payload.insuranceNumber, payload.insuranceExpire, payload.pollutionNumber, payload.pollutionExpire, payload.vehStatus, payload.qrStatus, payload.createdAt, payload.updatedAt]);
    },
    (t, error) => { console.log("db error insertVehicle"); console.log(t, error);},
    (t, success) => { successFunc() }
  )
}
const updateVehicle = (payload, successFunc) => {
  db.transaction( tx => {

    tx.executeSql('UPDATE "vehicalDetails" SET "insuranceNumber"='+payload.insuranceNumber+', "insuranceExpire"='+payload.insuranceExpire+', "pollutionNumber"='+payload.pollutionNumber+', "pollutionExpire"='+payload.pollutionExpire+', "vehStatus"='+payload.vehStatus+', "qrStatus"="'+payload.qrStatus+'"  WHERE "vehicleID"="'+payload.vehicleID+'";')
    
      // tx.executeSql("UPDATE 'vehicalDetails' SET 'insuranceNumber'='"+payload.insuranceNumber+"', 'insuranceExpire'='"+payload.insuranceExpire+"', 'pollutionNumber'='"+payload.pollutionNumber+"', 'pollutionExpire'='"+payload.pollutionExpire+"', 'vehStatus'='"+payload.vehStatus+"', 'qrStatus'="+payload.qrStatus+"  WHERE 'vehicleID'='"+payload.vehicleID+"';")
    },
    (t, error) => { console.log("db error updateVehicle"); console.log(t, error);},
    (t, success) => { successFunc() }
  )
}

const insertMechanic = (payloadList) => {
  let updateSuccess = false;
  // console.log('payloadList: ', payload)
  for(let i=0; i < payloadList.length; i++){
    // payload = payloadList[i];

    payloadList[i].location = JSON.stringify(payloadList[i].location);
    // payload.contact = JSON.stringify(payload.contact);
    // payload.holiday = JSON.stringify(payload.holiday);
    // let payloadList = payload;
    // console.log("payloadList.updatedAt: ", payloadList.updatedAt)
    db.transaction( tx => {
      tx.executeSql( 'insert into mechanicDetails ("mechanicID", picture, "name", address, pincode, "location", category, "type", contact, timings, holiday, "createdAt", "updatedAt") values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [payloadList[i].mechanicID, payloadList[i].picture, payloadList[i].name, payloadList[i].address, payloadList[i].location, payloadList[i].category, payloadList[i].type, payloadList[i].contact, payloadList[i].timings, payloadList[i].holiday, payloadList[i].createdAt, payloadList[i].updatedAt]);
    },
    (t, error) => { console.log("db error insertMechanic"); console.log(t, error);},
    (t, success) => { console.log('success') }
  )
  }  
}

const insertFuelDetails = ( payload) => {
  let payloadList = payload.list;
  for(let i=0; i < payloadList.length; i++){
    if( payloadList[i].district !== "" ){
      db.transaction( tx => {
          tx.executeSql( 'insert into fuelDetails ("state", district, "petrol", petrolChange, petrolSign, "diesel", dieselChange, "dieselSign") values (?, ?, ?, ?, ?, ?, ?, ?)', [payload.state, payloadList[i].district, payloadList[i].products[0].productPrice, payloadList[i].products[0].priceChange, payloadList[i].products[0].priceChangeSign, payloadList[i].products[1].productPrice, payloadList[i].products[1].priceChange, payloadList[i].products[1].priceChangeSign]);
        },
        (t, error) => { console.log("db error insertFuelDetails"); console.log(t, error);},
        (t, success) => { console.log('success') }
      )
    }
  } 
}

const insertUserOrderDetails = (payload, successFunc) => {

  db.transaction( tx => {
    tx.executeSql( 'insert into userOrderDetails ("orderID", "userID", "vehicleID", name, "contactNo", address, city, state, pincode, "refByCode", "orderStatus", "transactionId", "createdAt", "updatedAt") values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [payload.orderID, payload.userID, payload.vehicleID, payload.name, payload.contactNo, payload.address, payload.city, payload.state, payload.pincode,  payload.refByCode, payload.orderStatus, payload.transactionId, payload.createdAt, payload.updatedAt] );  
  },
    (t, error) => { console.log("db error insertUserOrderDetails"); console.log(t, error);},
    (t, success) => { successFunc() }
  )
}

const insertUserQRDetails = (payload, successFunc) => {
  console.log("User QR Payload:------->  ", payload);
  db.transaction( tx => {
    tx.executeSql( 'insert into qrCodeDetails (image, "qrCode", "qrStatus", "userID", "vehicleID", "primaryContact", "EmgContact", "createdAt", "updatedAt") values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [payload.image, payload.qrCode, payload.qrStatus, payload.userID, payload.vehicleID, payload.primaryContact, payload.EmgContact, payload.createdAt, payload.updatedAt] );  
  },
    (t, error) => { console.log("db error qrCodeDetails"); console.log(t, error);},
    (t, success) => { successFunc() }
  )
}

const updateUserQRDetails = (payload, successFunc) => {
  db.transaction( tx => {
      tx.executeSql("UPDATE qrCodeDetails SET primaryContact='"+payload.primaryContact+"', EmgContact='"+payload.EmgContact+"' WHERE qrCode="+payload.qrCode+";")
    },
    (t, error) => { console.log("db error updateUserQRDetails"); console.log(t, error);},
    (t, success) => { successFunc() }
  )
}


// const updateMechanic = (payload, successFunc) => {
//   db.transaction( tx => {
//       tx.executeSql("UPDATE mechanicDetails SET name='"+payload.name+"', address='"+payload.address+"', pincode="+payload.pincode+", location='"+payload.location+"', category='"+payload.category+"', type='"+payload.type+"', contact='"+payload.contact+"', createdAt='"+payload.createdAt+"', updatedAt='"+payload.updatedAt+"' WHERE mechanic_id="+payload.mechanic_id+";")
//     },
//     (t, error) => { console.log("db error updateMechanic"); console.log(t, error);},
//     (t, success) => { successFunc() }
//   )
// }

const deleteUsers = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM userDetails',
        [],
        (_, result) => { console.log("successfilly deleted user_details"); resolve(result) },
        (_, error) => { console.log("error dropping users table"); reject(error)
        }
      )
    })
  })
}

const deleteVehicle = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM vehicalDetails',
        [],
        (_, result) => { console.log("successfilly deleted vehical_details"); resolve(result) },
        (_, error) => { console.log("error dropping users table"); reject(error)
        }
      )
    })
  })
}

const deleteMechanic = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM mechanicDetails',
        [],
        (_, result) => { console.log("successfilly deleted mechanicDetails"); resolve(result) },
        (_, error) => { console.log("error dropping mechanicDetails table"); reject(error)
        }
      )
    })
  })
}

const deleteFuelDetails = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM fuelDetails',
        [],
        (_, result) => { console.log("successfilly deleted fuelDetails"); resolve(result) },
        (_, error) => { console.log("error dropping fuelDetails table"); reject(error)
        }
      )
    })
  })
}




const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM userDetails',
        [],
        (_, result) => { console.log("successfilly deleted user_details"); resolve(result) },
        (_, error) => { console.log("error dropping user_details table"); reject(error)
        }
      )
    })
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM vehicalDetails',
        [],
        (_, result) => { console.log("successfilly deleted vehical_details"); resolve(result) },
        (_, error) => { console.log("error dropping vehical_details table"); reject(error)
        }
      )
    })
    
    db.transaction(tx => {
      tx.executeSql(
        // 'DELETE FROM mechanicDetails',
        'DROP TABLE mechanicDetails',
        [],
        (_, result) => { console.log("successfilly deleted mechanicDetails"); resolve(result) },
        (_, error) => { console.log("error dropping mechanicDetails table"); reject(error)
        }
      )
    })
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM userOrderDetails',
        [],
        (_, result) => { console.log("successfilly deleted userOrderDetails"); resolve(result) },
        (_, error) => { console.log("error dropping userOrderDetails table"); reject(error)
        }
      )
    })
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE qrCodeDetails',
        [],
        (_, result) => { console.log("successfilly deleted qrCodeDetails"); resolve(result) },
        (_, error) => { console.log("error dropping qrCodeDetails table"); reject(error)
        }
      )
    })
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM fuelDetails',
        [],
        (_, result) => { console.log("successfilly deleted fuelDetails"); resolve(result) },
        (_, error) => { console.log("error dropping fuelDetails table"); reject(error)
        }
      )
    })
  })
}

const setupDatabaseAsync = async () => {
  console.log("creating DB");
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS "userDetails" (  "userID" uuid NOT NULL,  picture varchar(3000) NULL,  "name" varchar(255) NOT NULL,  "contactNo" float8 NOT NULL,  email varchar(255) NOT NULL,  address varchar(255) NOT NULL,  city varchar(255) NOT NULL,  state varchar(255) NOT NULL,  pincode varchar(255) NOT NULL,  "refCode" varchar(255) NOT NULL,  "refByCode" varchar(255) NULL,  "createdAt" timestamptz NOT NULL,  "updatedAt" timestamptz NOT NULL,  CONSTRAINT "userDetails_contactNo_key" UNIQUE ("contactNo"),  CONSTRAINT "userDetails_pkey" PRIMARY KEY ("userID") );'
        );
      },
      (_, error) => { console.log("db error creating users tables"); console.log('error: ', error); reject(error) },
      (_, success) => { console.log("db success creating users tables",success); resolve(success)}
    )
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS "vehicalDetails" (  "vehicleID" uuid NOT NULL,  "userID" uuid NOT NULL,  "regNumber" varchar(255) NOT NULL,  "owner" varchar(255) NOT NULL,  brand varchar(255) NOT NULL,  model varchar(255) NOT NULL,  "fuelType" varchar(255) NOT NULL, "vehType" varchar(255) NOT NULL,  "transmissionType" varchar(255) NOT NULL,  "insuranceNumber" varchar(255) NULL,  "insuranceExpire" varchar(255) NULL,  "pollutionNumber" varchar(255) NULL,  "pollutionExpire" varchar(255) NULL,  vehStatus varchar(255) NULL, "qrStatus" bool NULL,  "createdAt" timestamptz NOT NULL,  "updatedAt" timestamptz NOT NULL,  CONSTRAINT "vehicalDetails_pkey" PRIMARY KEY ("vehicleID") );'
      );
    },
    (_, error) => { console.log("db error creating vehicle tables"); console.log('error: ', error); reject(error) },
    (_, success) => { console.log("db success creating vehicle tables", success); resolve(success)}
  )
    db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS "mechanicDetails" (  "mechanicID" uuid NOT NULL,  picture varchar(3000) NULL,  "name" varchar(255) NOT NULL,  address varchar(255) NOT NULL,  pincode float8 NULL,  "location" varchar(1000) NULL,  category varchar(255) NULL,  "type" varchar(255) NULL,  contact varchar(1000) NULL,  timings varchar(255) NULL,  holiday varchar(1000) NULL,  "createdAt" timestamptz NOT NULL,  "updatedAt" timestamptz NULL,  CONSTRAINT "mechanicDetails_pkey" PRIMARY KEY ("mechanicID") );'
        );
      },
      (_, error) => { console.log("db error creating mechanicDetails tables"); console.log('error: ', error); reject(error) },
      (_, success) => { console.log("db success creating mechanicDetails tables", success); resolve(success)}
    )
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS "qrCodeDetails" (  image varchar(3000) NOT NULL,  "qrCode" varchar(255) NOT NULL,  "qrStatus" varchar(255) NOT NULL,  "userID" uuid NOT NULL,  "vehicleID" uuid NULL,  "primaryContact" float8 NOT NULL,  "EmgContact" varchar(255) NULL,  "createdAt" timestamptz NOT NULL,  "updatedAt" timestamptz NOT NULL,  CONSTRAINT "qrCodeDetails_pkey" PRIMARY KEY ("qrCode") );'
      );
    },
    (_, error) => { console.log("db error creating qrCodeDetails tables"); console.log('error: ', error); reject(error) },
    (_, success) => { console.log("db success creating qrCodeDetails tables", success); resolve(success)}
  )
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS "userOrderDetails" (  "orderID" uuid NOT NULL,  "userID" uuid NOT NULL,  "name" varchar(255) NOT NULL,  "contactNo" float8 NOT NULL,  address varchar(255) NOT NULL,  city varchar(255) NOT NULL,  state varchar(255) NOT NULL,  pincode varchar(255) NOT NULL,  "refByCode" varchar(255) NOT NULL,  "orderStatus" varchar(255) NOT NULL,  "transactionId" varchar(255) NOT NULL,  "createdAt" timestamptz NOT NULL,  "updatedAt" timestamptz NOT NULL,  CONSTRAINT "userOrderDetails_pkey" PRIMARY KEY ("orderID") );'
      );
    },
    (_, error) => { console.log("db error creating userOrderDetails tables"); console.log('error: ', error); reject(error) },
    (_, success) => { console.log("db success creating userOrderDetails tables", success); resolve(success)}
  )

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS "fuelDetails" (  "State" varchar(255) NOT NULL,  "district" varchar(255) NOT NULL,  "petrol" varchar(255) NOT NULL, "petrolChange" varchar(255) NOT NULL, "petrolSign" varchar(255) NOT NULL,  "diesel" varchar(255) NOT NULL, "dieselChange" varchar(255) NOT NULL, "dieselSign" varchar(255) NOT NULL );'
    );
  },
  (_, error) => { console.log("db error creating fuelDetails tables"); console.log('error: ', error); reject(error) },
  (_, success) => { console.log("db success creating fuelDetails tables", success); resolve(success)}
)
  })
}

const setupUsersAsync = async () => {
  return new Promise((resolve, _reject) => {
    db.transaction( tx => {
        tx.executeSql( 'insert into user_details (user_id, name, contact,  email, address, city, state, pincode) values (?, ?, ?, ?, ?, ?, ?, ?)', ["", "", "", "", "", "", "", ""] );
      },
      (t, error) => { console.log("db error insertUser"); console.log(error); resolve() },
      (t, success) => { resolve(success)}
    )
  })
}

export const database = {
  getUsers,
  insertUser,
  updateUser,
  setupDatabaseAsync,
  setupUsersAsync,
  dropDatabaseTablesAsync,
  insertVehicle,
  updateVehicle,
  getVehicle,
  insertMechanic,
  // updateMechanic,
  getMechanic,
  getUserOrderDetails,
  insertUserOrderDetails,

  getUserQRDetails,
  insertUserQRDetails,
  updateUserQRDetails,
  // insertUserOrderDetails,

  getFuelDetails,
  insertFuelDetails,

  deleteUsers,
  deleteVehicle,
  deleteMechanic,
  deleteFuelDetails
}