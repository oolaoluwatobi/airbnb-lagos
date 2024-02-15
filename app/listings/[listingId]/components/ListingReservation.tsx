'use client'

import { Range } from 'react-date-range'
import Calender from './Calender';
import Button from '@/app/components/Button';

interface IListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[]
}

const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates
}: IListingReservationProps) => {
  
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <p className='text-2xl font-semibold'>$ {price}</p>
        <p className='text-neutral-600 font-light'>night</p>
      </div>
      <hr />
      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className='p-4'>
        <Button
          onClick={onSubmit}
          disabled={disabled}
          className='w-full'
          label='Reserve' 
        />
      </div>
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <p >Total</p>
        <p >$ {totalPrice}</p>
      </div>
    </div>
  )
}

export default ListingReservation