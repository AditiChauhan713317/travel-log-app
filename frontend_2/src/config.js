
class config {


  // create travel log
  async get_travel_log({location, food, vibes, activities}) {

    try {
            
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/generate-travel-log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: location,
            food: food,
            vibes: vibes,
            activities: activities
          }),
        })

      if(response.ok) {
        const data = await response.json();
        // console.log(data);
        return data;
      }
      else {
        return null;
      }
     

  } catch (error) {
      console.log('ERROR::::get_travel_log', error);
      return null;
  }
  }

  // get all logs
  async get_all_logs() {

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/`);
      const data = await response.json();
      // console.log(data);
      // console.log(data.logs);
      // console.log(Array.isArray(data.logs));
      return data.logs; // returning the array 

    } catch (error) {
      console.log('Error get_all_logs:::::', error);
      return null;
    }
  }

  // get a log
  async get_log(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${id}`);
      const data = await response.json();
      console.log(data.log); 
      return data.log; // returning log object

    } catch (error) {
      console.log('Error get_log:::::', error);
      return null;
    }
  }

  // save log
  async save_log({title, user_responses, text }) {
   
    try {
            
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/save-log`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            user_responses: user_responses,
            text: text
          }),
        })

      const data = await response.json();
      console.log(data);
      if(data.log) return data.log;
      else return null;

  } catch (error) {
      console.log('ERROR::::save_log', error);
      return null;
  }

  }

  // delete log
  async delete_log(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/delete-log/${id}`, {
        method: 'DELETE'
      });
      if(response.status === 404) {
        console.log('log not found');
        return false;
      }
      const data = await response.json();
      // console.log(data);
      if(data.log) {
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.log('ERROR::::delete_log', error);
      return false;
    }
  }

  // edit log
  async edit_log(id, {title, user_responses, text}) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/edit-log/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          user_responses: user_responses,
          text: text
        }),
      })
      if(response.status === 404) {
        console.log('log not found');
        return null;
      }
      const data = await response.json();
      console.log(data);
      return data;
      
    } catch (error) {
      console.log('ERROR::::edit_log', error);
      return null;
    }
  }

}

const configObject = new config();

export default configObject;

