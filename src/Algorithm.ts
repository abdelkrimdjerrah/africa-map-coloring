interface Neighbors {
    [key: string]: string[];
}

interface Assignment {
    [key: string]: number;
}


const african_countries_neighbors:any = {
    "Nigeria" : ["Benin", "Cameroon", "Chad", "Niger"],
    "Benin" : ["Burkina Faso", "Niger", "Nigeria", "Togo"],
    "Togo" : ["Benin", "Burkina Faso", "Ghana"],
    "Ghana" : ["Burkina Faso", "Cote d'Ivoire", "Togo"],
    "Cote d'Ivoire" : ["Burkina Faso", "Ghana", "Guinea", "Liberia", "Mali"],
    "Burkina Faso" : ["Benin", "Cote d'Ivoire", "Ghana", "Mali", "Niger", "Togo"],
    "Mali" : ["Algeria", "Burkina Faso", "Cote d'Ivoire", "Guinea", "Mauritania", "Niger", "Senegal"],
    "Guinea" : ["Cote d'Ivoire", "Guinea-Bissau", "Liberia", "Mali", "Senegal", "Sierra Leone"],
    "Guinea-Bissau" : ["Guinea", "Senegal"],
    "Senegal" : ["Gambia", "Guinea", "Guinea-Bissau", "Mali", "Mauritania"],
    "Gambia" : ["Senegal"],
    "Mauritania" : ["Mali", "Senegal", "Western Sahara"],
    "Algeria" : ["Libya", "Mali", "Mauritania", "Morocco", "Niger", "Tunisia", "Western Sahara"],
    "Libya" : ["Algeria", "Chad", "Egypt", "Niger", "Sudan", "Tunisia"],
    "Chad" : ["Cameroon", "Central African Republic", "Libya", "Niger", "Nigeria", "Sudan"],
    "Cameroon" : ["Central African Republic", "Chad", "Congo", "Equatorial Guinea", "Gabon", "Nigeria"],
    "Central African Republic" : ["Cameroon", "Chad", "Congo", "Democratic Republic of Congo", "South Sudan", "Sudan"],
    "Congo" : ["Angola", "Cameroon", "Central African Republic", "Democratic Republic of Congo", "Gabon", "Republic of Congo"],
    "Democratic Republic of Congo" : ["Angola", "Burundi", "Central African Republic", "Congo", "Rwanda", "South Sudan", "Tanzania", "Uganda", "Zambia"],
    "Gabon" : ["Cameroon", "Congo", "Equatorial Guinea"],
    "Equatorial Guinea" : ["Cameroon", "Gabon"],
    "Angola" : ["Democratic Republic of Congo", "Namibia", "Zambia"],
    "Namibia" : ["Angola", "Botswana", "South Africa", "Zambia"],
    "Botswana" : ["Namibia", "South Africa", "Zambia", "Zimbabwe"],
    "South Africa" : ["Botswana", "Lesotho", "Mozambique", "Namibia", "Swaziland", "Zimbabwe"],
    "Lesotho" : ["South Africa"],
    "Swaziland" : ["South Africa"],
    "Zimbabwe" : ["Botswana", "Mozambique", "South Africa", "Zambia"],
    "Zambia" : ["Angola", "Botswana", "Democratic Republic of Congo", "Malawi", "Mozambique", "Namibia", "Tanzania", "Zimbabwe"],
    "Malawi" : ["Mozambique", "Tanzania", "Zambia"],
    "Mozambique" : ["Malawi", "South Africa", "Swaziland", "Tanzania", "Zambia", "Zimbabwe"],
    "Tanzania" : ["Burundi", "Democratic Republic of Congo", "Kenya", "Malawi", "Mozambique", "Rwanda", "Uganda", "Zambia"],
    "Kenya" : ["Ethiopia", "Somalia", "South Sudan", "Tanzania", "Uganda"],
    "Somalia" : ["Djibouti", "Ethiopia", "Kenya"],
    "Djibouti" : ["Eritrea", "Ethiopia", "Somalia"],
    "Eritrea" : ["Djibouti", "Ethiopia", "Sudan"],
    "Ethiopia" : ["Djibouti", "Eritrea", "Kenya", "Somalia", "South Sudan", "Sudan"],
    "South Sudan" : ["Central African Republic", "Democratic Republic of Congo", "Ethiopia", "Kenya", "Sudan", "Uganda"],
    "Uganda" : ["Democratic Republic of Congo", "Kenya", "Rwanda", "South Sudan", "Tanzania"],
    "Rwanda" : ["Burundi", "Democratic Republic of Congo", "Tanzania", "Uganda"],
    "Burundi" : ["Democratic Republic of Congo", "Rwanda", "Tanzania"],
    "Sao Tome and Principe" : ["Gabon","Equatorial Guinea"],
    "Cape Verde": [""],
    "Egypt": ["Libya", "Sudan"],
    "Sudan": ["Central African Republic", "Chad", "Egypt", "Eritrea", "Ethiopia", "South Sudan"],
    "Niger": ["Algeria", "Benin", "Burkina Faso", "Chad", "Libya", "Mali", "Nigeria"],
    "Tunisia": ["Algeria", "Libya"],
    "Madagascar": [""],
    "Liberia" : ["Cote d'Ivoire", "Guinea", "Sierra Leone"],
    "Sierra Leone" : ["Guinea", "Liberia"],
    "Republic of Congo" : ["Angola", "Congo"],
    "Zanzibar" : ["Tanzania"],
    "Mayotte" : ["Comoros"],
    "Morocco" : ["Algeria", "Mauritania"],
    "Western Sahara" : ["Algeria", "Mauritania", "Morocco"],
  }

  const african_countries: string[] = Object.keys(african_countries_neighbors);
  const colors: number[] = [1];
  
  const isSafe = (country: string, color: number, assignment: Assignment): boolean => {
      for (let neighbor of african_countries_neighbors[country]) {
          if (assignment[neighbor] == color) {
              return false;
          }
      }
      return true;
  };
  
  const backtracking = (assignment: Assignment): Assignment | null => {
      if (Object.keys(assignment).length === african_countries.length) {
          return assignment;
      }
      let unassigned: string[] = african_countries.filter((country) => !(country in assignment));
      let country: string = unassigned[0];
      for (let color of colors) {
          if (isSafe(country, color, assignment)) {
              assignment[country] = color;
              let result = backtracking(assignment);
              if (result !== null) {
                  if(country == "Morocco"){
                    console.log("Morocco"  + assignment["Morocco"])
                    console.log("sahara" + assignment["Western Sahara"])
                    console.log(isSafe(country, color, assignment))
                  }
                  return result;
              }
              delete assignment[country];
          }
      }
      return null;
  };
  
  export const solve = (): { coloration: Assignment, numberOfColors: number } => {
      let assignment: Assignment = {};
      let result: Assignment | null = backtracking(assignment);
      while (result === null) {
          colors.push(colors[colors.length - 1] + 1);
          result = backtracking(assignment);
      }
      return { coloration: result, numberOfColors: colors.length };
  };