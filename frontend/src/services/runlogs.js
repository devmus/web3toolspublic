import axios from 'axios';

// Backend

export const createRunLog = async (data) => {

  try {
    const response = await axios.post(
      'http://localhost:5001/api/v1/stepn/runlog/create',
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRunLogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/stepn/runlog/list`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  export const updateRun = async (runIndex, data) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/v1/stepn/runlog/run/${runIndex}`,
        data
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  export const getTokenPrice = async (id) => {

    try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/stepn/runlog/token/${id}`
      );

      const value = response.data.data.data.value;
      
      return value;
    } catch (error) {
      console.log(error);
      return error.response.data;      
    }
  };
  

// Hooks

const filterGmt = (data) => {
  return data.filter((run) => run.token === "GMT")
}

const filterGst = (data) => {
  return data.filter((run) => run.token === "GST")
}

const filterGains = (data) => {
  return data.map((run) => run.gains)
}

const filterRuns = (data) => {
  return data.length;
}

const filterEnergy = (data) => {
  return data.map((run) => run.energy)
}

export const calcTotalGMT = (runLogList) => {
  const filteredData = filterGmt(runLogList)
  const totalValueGmt = filterGains(filteredData)

  let sum = 0;

  for (let i = 0; i < totalValueGmt.length; i++) {
    sum += Number(totalValueGmt[i]);
  }

  return sum;    
}

export const calcTotalGST = (runLogList) => {
  const filteredData = filterGst(runLogList)
  const totalValueGmt = filterGains(filteredData)

  let sum = 0;

  for (let i = 0; i < totalValueGmt.length; i++) {
    sum += Number(totalValueGmt[i]);
  }

  return sum;    
}

export const calcTotalGSTEnergy = (runLogList) => {
  const filteredData = filterGst(runLogList)
  const totalValueGmt = filterEnergy(filteredData)

  let sum = 0;

  for (let i = 0; i < totalValueGmt.length; i++) {
    sum += Number(totalValueGmt[i]);
  }

  return sum;    
}

export const calcTotalGMTEnergy = (runLogList) => {
  const filteredData = filterGmt(runLogList)
  const totalValueGmt = filterEnergy(filteredData)

  let sum = 0;

  for (let i = 0; i < totalValueGmt.length; i++) {
    sum += Number(totalValueGmt[i]);
  }

  return sum;    
}

export const calcTotalGMTRuns = (runLogList) => {
  const filteredData = filterGmt(runLogList)
  const totalRuns = filterRuns(filteredData)

  return totalRuns;    
}

export const calcTotalGSTRuns = (runLogList) => {
  const filteredData = filterGst(runLogList)
  const totalRuns = filterRuns(filteredData)

  return totalRuns;    
}