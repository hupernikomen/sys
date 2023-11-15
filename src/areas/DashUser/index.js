import moment from "moment"

export default function DashUser({ indice, client, setClient, isOnline, registerPayment, diffDias, Payment, setValuePayment, valuePayment, setDatePayment, datePayment }) {

    return (
        <div style={{
            gridRow: '1 / span 2',
            gridColumn: `${indice} / span 1`,
            backgroundColor: '#282c34',
            padding: 6,
            height: '50vh',
        }}>

            <div style={{ height: 40, marginBottom: 6, fontSize: 20, fontWeight: 700, color: '#fff', textAlign: 'center' }}>{client?.name}</div>

            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input style={{ height: 40, width: '100%', padding: 12, fontFamily: 'sans-serif', backgroundColor: '#21252b', border: 'none', color: '#aaa' }} type='date' onChange={(e) => setDatePayment(moment(e.target.value).format("DD/MM/YYYY"))} />
                    <input placeholder='R$ 0,00' style={{ border: 'none', height: 40, width: '100%', padding: 12, backgroundColor: '#21252b', color: '#aaa' }} onChange={(e) => setValuePayment(e.target.value)} />
                </div>
                <button disabled={!client || !datePayment || datePayment === 'Invalid date' || !valuePayment} onClick={() => Payment()} style={{ width: '100%', height: 40, border: 'none', marginTop: 6, padding: 12, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>Pagar</button>
            </div>



            <div style={{ display: 'flex', alignItems: 'center', marginTop:12 }}>
                <p style={{ margin: 0, fontSize: 12, color: '#aaa' }}>Status: {isOnline ? "Online" : "Offline"}</p>
                <div style={{ marginLeft: 6, width: 10, height: 10, borderRadius: 10, backgroundColor: isOnline ? '#76FF03' : "#777" }} />
            </div>

            {!!client?.profession ? <p style={{ fontSize: 12, color: '#aaa' }}>Profissão: {client?.profession?.name}</p> : null}

            <p onClick={() => registerPayment?.createdAt && alert("Ultimo registro de pagamento: " + moment(registerPayment?.createdAt).format('DD/MM/YYYY'))} style={{ fontSize: 12, color: '#aaa' }}>Venc.: {registerPayment?.datePayment} - {diffDias >= 0 ? diffDias + " dias" : "0"} </p>

        </div>
    )
}