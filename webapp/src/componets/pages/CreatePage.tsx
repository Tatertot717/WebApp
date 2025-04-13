//4th view, white bg with create poll form

'use client'
import React, { useState } from 'react';
import Options from '../Options';

const CreatePage = () => {
    const [options, setOptions] = useState<string[]>([]);
    const optionCount = 4;
  
    const handleOptionsChange = (values: string[]) => {
      setOptions(values);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Submitted options:', options);
    };
  
    return (
        <div>   
        <h2>Create a Poll</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Options count={optionCount} onChange={handleOptionsChange} />
          
          <button type="button" onClick={addOption} className="border px-2 py-1 rounded">
            +
          </button>
      
          <label className="block">
            <input type="checkbox" name="multichoice" className="mr-2" />
            Allow multiple choices
          </label>
      
          <label className="block">
            <input type="checkbox" name="loginreq" className="mr-2" />
            Require login to vote
          </label>
      
          <input
            type="submit"
            value="Create Poll"
            className="bg-green-500 text-white p-2 rounded cursor-pointer"
          />
      
          {/* OR just use a styled button if you prefer */}
          {/* 
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
          */}
        </form>
      </div>      
    );
  };

//array of options

function addOption() {
    
}

function onSubmit() {
    console.log("New Poll:\n");
    for(let x in options) {
        console.log(x.text+"\n");
    }
}

export default CreatePage;