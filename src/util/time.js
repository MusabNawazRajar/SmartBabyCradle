import { fetchFirebaseTimestamp } from "../database/fetchData";

export function getCurrntTime() {
  // Get current date and time
  const currentDate = new Date();

  // Get individual components of the date and time
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so we add 1
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Construct the timestamp string
  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  console.log(timestamp);

  return timestamp;
}

// util/time.js



export async function calculateTimeDifference() {
  try {
    const currentTime = new Date(); // Get current time as Date object
    const firebaseTime = await fetchFirebaseTimestamp(); // Retrieve Firebase timestamp

    console.log("Firebase timestamp:", firebaseTime);

    if (!firebaseTime) {
      console.error('Firebase timestamp is null or undefined');
      return false;
    }

    // Convert firebaseTime string to Date object
    const firebaseDate = new Date(firebaseTime);

    // Calculate difference in milliseconds
    const difference = Math.abs(currentTime - firebaseDate);

    // Convert milliseconds to minutes
    const differenceInMinutes = difference / (1000 * 60);

    console.log('Difference in minutes:', differenceInMinutes);

    return differenceInMinutes > 5;
  } catch (error) {
    console.error('Error calculating time difference:', error);
    return false;
  }
}


