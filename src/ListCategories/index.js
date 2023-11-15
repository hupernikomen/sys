import { useEffect, useState } from "react"

export default function ListCategories({ getApi, searchApi, indice, setCategorySelected, categorySelected, categoryName }) {

   const [categories, setCategories] = useState([])

   useEffect(() => {
      HandleCategories()
   }, [searchApi, categorySelected,categoryName])


   async function HandleCategories() {
      try {
         const response = await getApi(searchApi).get('categories')
         setCategories(response.data)
      } catch (error) {

      }
   }

   return (
      <div style={{
         gridRow: '1 / span 2',
         gridColumn: `${indice} / span 1`,
         backgroundColor: '#282c34',
         padding: 6,
         overflow: 'auto',
        }}>

         <div style={{ height: 40, marginBottom: 6, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <div style={{ color: '#aaa', fontSize: 14 }}>Cat / Sub</div>
         </div>

         {categories.map((category) => {
            return (
               <div key={category.id} onClick={() => setCategorySelected(!categorySelected ? category.id : '')}>
                  
                  <div style={{ flexDirection: 'row', marginBottom: 6, backgroundColor: categorySelected === category.id ? '#2E7D32' : '#21252b', height: 40, display: 'flex', alignItems: 'center', justifyContent: "space-between", padding: '0px 12px' }}>
                     <div style={{ color: '#aaa', fontSize: 13, }}>{category.name}</div>
                     <div style={{ color: '#aaa', fontSize: 14 }}>{category.subcategory.length}</div>
                  </div>

                  {category.subcategory.map((sub) => {

                     if (categorySelected !== sub.categoryID) {
                       return 
                     }
                     return (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 12px' }}>
                           <div style={{ height: 30, marginLeft: 24, color: '#aaa', fontSize: 13, fontWeight: 400 }}>{sub.name}</div>
                           <div style={{ height: 30, marginLeft: 24, color: '#aaa', fontSize: 13 }}>{sub._count.product}</div>
                        </div>
                     )
                  })}
               </div>
            )
         })}
      </div>
   )
}