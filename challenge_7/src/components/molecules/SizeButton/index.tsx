import React, { useState } from 'react'
import { Button } from '../..'

interface SizeButtonProps {
  setSizeFilter: React.Dispatch<React.SetStateAction<string>>;
}

function SizeButton({setSizeFilter}: SizeButtonProps) {
  const [filter, setFilter] = useState<string>('');
  const handleSizeFilter = (filter: string) => {
    setFilter(filter);
    setSizeFilter(filter);
  }
  return (
    <>
      <div className="mb-5 flex gap-2">
        <Button name='All' className={`border border-indigo-700 px-5 py-1 text-indigo-700 rounded font-semibold ${!filter ? 'bg-indigo-200' : ''}`} onClick={() => handleSizeFilter('')}/>
        <Button name='Small' className={`border border-indigo-700 px-4 py-1 text-indigo-700 rounded font-semibold ${filter === 'small' ? 'bg-indigo-200' : ''}`} onClick={() => handleSizeFilter('small')}/>
        <Button name='Medium' className={`border border-indigo-700 px-4 py-1 text-indigo-700 rounded font-semibold ${filter === 'medium' ? 'bg-indigo-200' : ''}`} onClick={() => handleSizeFilter('medium')}/>
        <Button name='Large' className={`border border-indigo-700 px-4 py-1 text-indigo-700 rounded font-semibold ${filter === 'large' ? 'bg-indigo-200' : ''}`} onClick={() => handleSizeFilter('large')}/>
      </div>
    </>
  )
}

export default SizeButton