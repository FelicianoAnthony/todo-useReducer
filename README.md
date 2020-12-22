# todo app with Context API + reducer pattern 

  * npm install ; npm start 
  
  * add todo with input field + button, click to remove 

  * reducer pattern is like so: 

      * component receives Context from Context Provider (initial state you defined & dispatch method which is react defined)
        * on functions mapped to event handlers, dispatch an Action with a Payload to Context Provider
          * Reducer performs action on state depending on action type passed to it ( never manipulate state directly, always manipulate a copy )
            * components wrapped by Context Provider see there was a change and re-render