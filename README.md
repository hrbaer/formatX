# formatX
An alternative formatter

  Usage
  1. Define a format string.
     | A Separator for items, such as values, variables, labels and functions
     $ Prefix used to specify a variable of your choice
     # Prefix used to denote a number
     & Prefix for a string
     _ Function prefix
     > Output of the current value
     % If you like to use comments
  2. Call fx(fmt) to get a format function for the specified format string.
     Add any functions using setFunction(name, function) to extend the available functions.
  3. Call the format function with any number of unnamed and named arguments.
     A named argument is defined by the following object: { name: <name>, value: <value> }
