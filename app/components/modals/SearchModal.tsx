'use client'

import qs from 'query-string'
import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect"
import { formatISO } from 'date-fns'
import Heading from '../Heading'
import Calender from '@/app/listings/[listingId]/components/Calender'
import Counter from '../inputs/Counter'

enum STEPS {
  LOCATION = 0,
  DATES = 1,
  INFO = 2
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [location, setLocation] = useState<CountrySelectValue>()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location])
  
  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])
  
  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {};

    if (params) {
      // currentQuery = Object.fromEntries(params) as Query;
      // currentQuery = parseSearchParamString(params.get("query") || "");
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = { 
      ...currentQuery, 
      locationValue: location?.value, 
      dateRange, 
      guestCount, 
      roomCount, 
      bathroomCount 
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }
    
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl({
      url: '/', 
      query: updatedQuery 
    }, { skipNull: true })

    setStep(STEPS.LOCATION)
    searchModal.onClose()

    router.push(url)
    
  }, [step, onNext, location, dateRange, guestCount, roomCount, bathroomCount, params, searchModal, router])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search"
    }

    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return "Cancel"
    }

    return "Back"
  }, [step])
  
  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location'
      />
      <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)} />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Find the perfect date'
        />
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }
  
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How many guests?'
          subtitle='Find the perfect place!'
        />
        <Counter
          title='Guests'
          subtitle='How many guests are coming?'
          value={guestCount}
          onChange={(value: number) => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={(value: number) => setRoomCount(value)} 
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
          value={bathroomCount}
          onChange={(value: number) => setBathroomCount(value)} 
        />
      </div>
    )
  }
  
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      title='Filters'
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default SearchModal