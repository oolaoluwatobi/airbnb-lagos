'use client'

import { categories } from '@/utils/categoriesData'
import Container from '../Container'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  }
   
  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {
          categories.map((item, index) => (
            <CategoryBox key={item.label} label={item.label} icon={item.icon} selected={category === item.label} />
          ))
        }
      </div>
    </Container>
  )
}

export default Categories