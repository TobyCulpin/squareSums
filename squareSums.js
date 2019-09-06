//Attempt no. 2

/*

//Generates a list of squares between theoretical range of 3 and 1999  [ 4, 9, ..., 1849, 1936 ]
var squares = [];
for (let c1 = 2; c1 <= 44; c1++)
{
    squares.push(c1 ** 2);
}
 
var values = [];
var paths = [[]];//2D array of possible next numbers to use from the indexed 'column'.  Generated and regenerated at calculation time
 
//Array of indexes detailing the current working path for each set.  Setting values to 0
var pathSelection = [];
for (let c1 = 0; c1 < 1000; c1++)
{
    pathSelection[c1] = 0;
}
 
function square_sums_row(n)
{
    let nextPath = []
 
    for (let c0 = 0; c0 < n; c0++)
    {
        nextPath = getNextPath(c0-1, n, values);
 
        if (nextPath.length == 0)
        {
            while (true)
            {
                if (!incrementPathSelection(c0 - 1))//Cannot choose another path - need to go back another level!
                {
                    pathSelection[c0 - 1] = 0;
 
                    if (c0 == 1)
                    {
                        console.log(n, "false");
                        return false;//reached the final path on index 0 and there are no more options
                    }
 
                    c0--;
                    continue;
                }
                break;
            }
            
            
            for (let c1 = c0; c1 <= n; c1++) {
                pathSelection[c1] = 0;
            }

            

            
            //Resets all path selections AFTER the change to 0
            //pathSelection = pathSelection.slice(0, c0);
            //Clear the invalid numbers from the values so that they aren't ommited from future paths to be calculated
            values = values.slice(0, c0 - 1);
 
            c0 = c0 - 2;//Goes back one
            continue;//continue keyword incurs c0++, so c0 = c0 - 2 + c0++ acts like c0 = c0 - 1
        }
 
        paths[c0] = nextPath;
        values[c0] = paths[c0][pathSelection[c0]] //choosePath(paths[c0], c0);
    }
    console.log(n, "true");
    return values;
}
 
//Returns the set of possible numbers to use after the index
function getNextPath(index, end, currentValues)
{
    var v = [];
 
    //For initial path creation.  returns [ 1, 2, ..., n - 1, n ]
    if (index < 0)
    {
        for (let c1 = 1; c1 <= end; c1++)
        {
            v.push(c1);
        }
        return v;
    }
 
    for (let c1 = 1; c1 <= end; c1++)
    {
        //If the indexed value plus any number between 1 and n is square
        //And the number is not already been used.
        if (squares.includes(currentValues[index] + c1) && !(currentValues.includes(c1)))
        {
            //Gets added to the list of possibilities
            v.push(c1);
        }
    }
    return v;
}
 
function incrementPathSelection(index)
{
    let value = (paths[index].length - 1) - pathSelection[index];
    pathSelection[index] += Math.min(1, value);
    return value;
}

for (let i = 1; i < 50; ++i)
{
    square_sums_row(i);
}


*/

//Attempt 3


var squares = [];

//Generates a list of squares between theoretical range of 3 and 1999  [ 4, 9, ..., 1849, 1936 ]
function genSquares(n)
{
    squares = [];
    for (let c1 = 2; c1 <= 44; c1++)
    { 
        squares.push(c1 ** 2);
    }
    squares = squares.slice(0, Math.floor(Math.sqrt(n + (n - 1))) - 1);
}

let str = ["memes", "2", "4"]
str.splice(2, 1, "insert")

var values = [];

//pairs[0] is 1 partner
//pairs[1] is 2 partners
//pairs[2] is many partners
var pairs = new Map();

var saveForLast = 0;

function init(n)
{
    saveForLast = 0;
    pairs = new Map();
    values = [];
    genSquares(n);
}

function square_sums_row(n)
{
  init(n);
  if (!getPartners(n))
  {
      console.log(n, "false 1");
      return false;
  }


  let next = 0;
  if (chooseFirst === false)
  {
      console.log(n, "false 2");
      return false;
  }

  next = chooseFirst(n);
  if (next == false)
  {
      console.log(n, "false 3");
      return false;
  }

  useNext(next, n);

  let stopPoint = n - 1;

  if (saveForLast != 0)
  {
      //--stopPoint;
  }

  for (let c0 = 0; c0 < stopPoint; ++c0)
  {
      next = chooseNext(values[c0]);
      if (next == false)
      {
      console.error(n, "false 4", c0);
      return false;
      }
      useNext(next, n);
  }


//   console.log(next);
//   console.log(pairs);
//   console.log(values);

      console.log(n, "true");
      return values;
}

function chooseFirst(n)
{
    let singles = [];
    for (let c1 = 1; c1 <= n; ++c1)
    {
        if (pairs[c1].length <= 1)
        {
            if (pairs[c1].length == 0)
            {
                return false;
            }
            singles.push(c1);
        }
    }
    if (singles.length == 0)
    {
        return 1;
    }
    if (singles.length > 2)
    {
        return false;
    }
    if (singles.length = 2)
    {
        saveForLast = singles[1];
    }

    return singles[0];
}

function chooseNext(v)
{
    let value = 100;
    let index = 0;
    for (let c1 of pairs[v]) //pairs[v] is an array and c1 is the numbers stored in the array
    {
        c1 = parseInt(c1);
        

        if (pairs[c1].length < value)
        {
            value = pairs[c1].length;
            index = c1;
        }
    }
    if (value == 100)
    {
        return false;
    }
    return index;
}

function useNext(value, n)
{
    values.push(value);

    // remove value from the entire pairs map
    for (c1 = 1; c1 <= n; ++c1)
    {
        for (c2 = 0; c2 < pairs[c1].length; ++c2)
        {
            if (pairs[c1][c2] == value)
            {
                pairs[c1].splice(c2, 1);
                break;
            }
        }
    }
}

function getPartners(n)
{
    let tempMap = new Map();
    for (let c1 = 1; c1 <= n; ++c1)
    {
        tempMap[c1] = [];
        for (let c2 = 1; c2 <= n; ++c2)
        {
            if (squares.includes(c1 + c2) && c1 != c2)
            {
                tempMap[c1].push(c2);
            }
        }
        if (tempMap[c1].length == 0)
        {
            return false
        }
        pairs[c1] = tempMap[c1];
    }
    return true;
}


for (let i = 15; i < 1000; ++i)
{
    
    square_sums_row(i);
}

//console.log(square_sums_row(37));