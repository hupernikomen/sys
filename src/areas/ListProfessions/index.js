import { useState, useContext, useEffect } from "react"

import { AppContext } from "../../contexts"

export default function ListProfessions() {

    const response = localStorage.getItem('@authGuia')
    const credentials = JSON.parse(response)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${credentials?.token}`
    }

    const { getApi, searchApi, professions, client, HandlePersons } = useContext(AppContext)


    async function PutPerson(professionSelected) {
        if (!client?.id) return

        await getApi(searchApi).put(`person?personID=${client?.id}`, { professionID: professionSelected?.id }, { headers })
        HandlePersons()
    }



    return (
        <div style={{
            marginBottom: 2,
            backgroundColor: '#282c34',
            padding: 6,
        }}>

            <div style={{ height: 40, marginBottom: 2, display: 'flex', alignItems: 'center' }}>
                <div style={{ color: '#aaa', fontSize: 14, textAlign: 'center', width: '100%' }}>Profissões</div>
            </div>

            {professions.map((profession, i) => {
                return (
                    <div onClick={() => PutPerson(profession)} key={i} style={{ flexDirection: 'column', marginBottom: 2, backgroundColor: '#21252b', height: 35, display: 'flex', alignItems: 'flex-start', justifyContent: "center", paddingLeft: 12 }}>
                        <div style={{ color: '#aaa', fontSize: 13, }}>{profession.name}</div>
                    </div>
                )
            })}
        </div>
    )


}