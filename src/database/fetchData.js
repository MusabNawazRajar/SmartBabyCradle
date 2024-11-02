import "firebase/compat/database";
import firebase from 'firebase/compat/app';


// Function to add data change listener
export const addDataListener = (ref, onChange) => ref.on('value', onChange);

// Function to remove data change listener
export const removeDataListener = (ref, onChange) => ref.off('value', onChange);


export const fetchData = (ref, stateUpdater, label) => async () => {
  try {
    const snapshot = await ref.once("value");
    const latestValue =
      snapshot.val()?.[Object.keys(snapshot.val()).pop()]?.value || false;
    stateUpdater(latestValue);
    // console.log(`${label}: ${latestValue}`);
  } catch (error) {
    // console.error(`Error fetching ${label}:`, error.message);
  }
};

export const fetchDataBoolean = (ref, stateUpdater, relatedNodeKey) => {
  return async () => {
    try {
      const snapshot = await ref.limitToLast(1).once("value");
      const latestEntry = snapshot.val();
      const latestValue = latestEntry
        ? Object.values(latestEntry)[0][relatedNodeKey]
        : false;
      stateUpdater(latestValue);
    } catch (error) {
      // console.error(`Error fetching ${stateUpdater.name}:`, error);
    }
  };
};




export const getFirebaseValueInArryaOfObjects = async (middleNode) => {
  try {
    const ref = firebase.database().ref(`SmartBabyCradle/${middleNode}`);
    const snapshot = await ref.once("value");
    const data = snapshot.val();

    const filteredArray = [];
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value.isNotified === false) {
          filteredArray.push({ key, ...value });
        }
      });
    }

    return filteredArray;
  } catch (error) {
    console.error(`Error fetching ${middleNode} data:`, error.message);
    return null;
  }
};



export const getLatestValue1 = async (middleNode, valueNode) => {
 
  try {
    const ref = firebase.database().ref(`SmartBabyCradle/${middleNode}`);

    const snapshot = await ref.once("value");
    console.log(snapshot);
    const latestKey = Object.keys(snapshot.val()).pop();
    const latestValue = snapshot.val()?.[latestKey]?.[valueNode] || false;

    

    

    
      return latestValue;
    
  } catch (error) {
    // console.error(`Error fetching ${middleNode} data:`, error.message);
    return null;
  }
};




export const getLatestBoolValue = async (middleNode, valueNode) => {
  let valuesArray = [];

  try {
    const ref = firebase.database().ref(`SmartBabyCradle/${middleNode}`);

    const snapshot = await ref.once("value");
    const latestKey = Object.keys(snapshot.val()).pop();
    const latestValue = snapshot.val()?.[latestKey]?.[valueNode];

    valuesArray.push(latestValue);

    const secondLatestKey = Object.keys(snapshot.val()).reverse()[1];
    const secondLatestValue = snapshot.val()?.[secondLatestKey]?.value || false;
    

    valuesArray.push(secondLatestValue);

    // console.log("Bool value");
    // console.log(valuesArray);


    if (valuesArray !== undefined) {
      // console.log(`Latest ${middleNode} ${valueNode} Status:`, latestValue);
      return valuesArray;
    } else {
      // console.log(`Latest ${middleNode} ${valueNode} Status is undefined. Check the format in Firebase.`);
      return null;
    }
  } catch (error) {
    // console.error(`Error fetching ${middleNode} ${valueNode} data:`, error.message);
    return null;
  }
};


export const fetchAllBooleanData = async (ref) => {
  try {
    const snapshot = await ref.once("value");
    const notifications = snapshot.val();

    const filteredValues = Object.values(notifications).filter(notification => !notification.isNotified);

    return filteredValues;
  } catch (error) {
    // Handle error
    // console.error("Error fetching data:", error);
    return null;
  }
};


export async function fetchFirebaseTimestamp() {
  try {
    const snapshot = await firebase.database().ref('SmartBabyCradle/ActualUsageData/TimestampForReliability/Timestamp').once('value');
    const timestamp = snapshot.val();
    return timestamp;
  } catch (error) {
    console.error('Error fetching Firebase timestamp:', error);
    return null;
  }
}

export async function getOverwrittenData(path, setIsComponentActive) {
  let existingPath = '/SmartBabyCradle';
  existingPath += path;
  try {
    const ref = firebase.database().ref(existingPath);
    // Set up a listener for real-time updates
    ref.on('value', snapshot => {
      const data = snapshot.val();
      // Update the state with fetched data
      setIsComponentActive(data);
    });

    // Returning the reference allows you to remove the listener when necessary
    return ref;
  } catch (error) {
    console.error('Error fetching Firebase timestamp:', error);
    return null;
  }
}






export function getFirebaseReference(middleNode) {
  return firebase.database().ref(`SmartBabyCradle/${middleNode}`);
}



export function handleReferenceAndState(configurations) {
  return () => {
    const dataChangeListeners = [];

    // Fetch initial data for each configuration
    configurations.forEach(({ ref, stateUpdater, label }) => {
      const fetchDataCallback = fetchData(ref, stateUpdater, label);
      fetchDataCallback(); // Fetch initial data
      dataChangeListeners.push({ ref, callback: fetchDataCallback });
      addDataListener(ref, fetchDataCallback);
    });

    // Cleanup: Remove data change listeners when component unmounts
    return () => {
      dataChangeListeners.forEach(({ ref, callback }) => {
        removeDataListener(ref, callback);
      });
    };
  };
}

export const fetchFirebaseIsActive = (path, setIsActive) => {
  const ref = firebase.database().ref(path);

  const callback = (snapshot) => {
    const isActive = snapshot.val();
    console.log("Fetched value from path:", path, "Value:", isActive);
    setIsActive(isActive);
  };

  ref.on('value', callback, (error) => {
    console.error("Error fetching value from path:", path, "Error:", error);
  });

  return () => ref.off('value', callback);
};



