let a = TabList.getNames()
  .filter(str => str.includes("Area:")) // First, filter strings containing "Area:"
  .map(str => str.split("Area:")[1].trim()); // Then, get the part after "Area:"
