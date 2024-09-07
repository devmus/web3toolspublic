// Assetdash

export const sortTickerAsc = (data) => {

    const sortedArray = data.sort((a, b) => {
        if (a.ticker < b.ticker) {
          return -1;
        }
        if (a.ticker > b.ticker) {
          return 1;
        }
        return 0;
      });

      return sortedArray;
}

// Stepn

export const sortDateAsc = (data) => {

    const sortedArray = data.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        if (a.time < b.time) {
            return 1;
        }
        if (a.time > b.time) {
            return -1;
        }
        return 0;
      });

      return sortedArray;
}

export const sortDateDesc = (data) => {

    const sortedArray = data.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        if (a.time < b.time) {
            return 1;
        }
        if (a.time > b.time) {
            return -1;
        }
        return 0;
      });

      return sortedArray;
}