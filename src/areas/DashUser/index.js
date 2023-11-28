import moment from "moment"
import { useState, useContext, useEffect } from "react"
import Resizer from "react-image-file-resizer";
import { AppContext } from "../../contexts";

export default function DashUser({ Payment }) {

    const [datePayment, setDatePayment] = useState(null)
    const [valuePayment, setValuePayment] = useState(0)
    const [registerPayment, setRegisterPayment] = useState(null)


    const formattedDatePayment = moment(registerPayment?.datePayment, 'DD/MM/YYYY');
    const diffDias = formattedDatePayment.diff(moment(), 'days');
    const isOnline = moment().isBefore(formattedDatePayment);

    const [file, setFile] = useState(null)

    const { client, getApi, searchApi, setStatusConnection } = useContext(AppContext)
    const [route] = useState('Loja')
    const [paramsID, setParamsID] = useState(client?.userID)
    const [numberMonth, setNumberMonth] = useState(0)

    const [statusPayment, setStatusPayment] = useState(null)

    useEffect(() => {
        setParamsID(client?.userID)
        HandlePayment()
    }, [client])


    async function Payment() {
        let authGuia = localStorage.getItem('@authGuia')
        let credentials = await JSON.parse(authGuia)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.token}`
        }

        var today = moment();
        var futureDate = today.add(numberMonth, 'months');

        await getApi(searchApi).post(`payment?userID=${client?.userID}`, {
            value: valuePayment,
            expiration: futureDate.format('DD/MM/YYYY')
        }, { headers })
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
        // }
    }

    async function HandlePayment() {
        await getApi(searchApi).get(`payments?userID=${client?.userID}`)
            .then((response) => setRegisterPayment(response.data))
            .catch((error) => {
                if (error.message === 'Network Error') {
                    setStatusConnection(false)
                }
            })
    }





    const SendBanner = async (file) => {

        if (file === '') {
            alert("Campos incomletos")
            return
        }

        let authGuia = localStorage.getItem('@authGuia')
        let credentials = await JSON.parse(authGuia)

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${credentials?.token}`
        }

        const formData = new FormData()
        formData.append('image', file)
        formData.append('paramsID', paramsID)
        formData.append('route', route)

        const bannerExiste = await getApi(searchApi).get(`banner?userID=${client.userID}`)

        if (bannerExiste.data) {
            if (window.confirm("Deseja atualizar banner?")) {
                await getApi(searchApi).put(`banner?userID=${client.userID}`, formData, { headers })
                    .then(() => {
                    })
                    .catch(() => alert("Erro ao enviar banner"))
            }
            return
        }

        await getApi(searchApi).post(`banner?userID=${client.userID}`, formData, { headers })
            .then((response) => {
                console.log(response.data);
                // localStorage.setItem('@localuserID', JSON.stringify(null))
            })
            .catch(() => alert("Erro ao enviar banner"))
    }

    async function PutStatusPayment(e, payment) {
        let authGuia = localStorage.getItem('@authGuia')
        let credentials = await JSON.parse(authGuia)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${credentials.token}`
        }
        await getApi(searchApi).put(`payment?paymentID=${payment}`, { status: e.target.value }, { headers })
        .then(() => HandlePayment())
    }

    const HandleFile = (e) => {
        if (e.target.files[0]) {
            Resizer.imageFileResizer(
                e.target.files[0],
                1000,
                500,
                "JPEG",
                100,
                0,
                (uri) => {
                    setFile(uri);
                },
                "file"
            );
        }
    };


    return (
        <div style={{
            marginBottom: 2,
            backgroundColor: '#21252b',
            padding: 6,
            display: 'flex',
            flexDirection: 'column'
        }}>


            <div>
                <div style={{ color: '#aaa', fontSize: 14 }}>{client?.name}</div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input placeholder='0' style={{ border: 'none', padding: '0px 12px', height: 35, width: '100%', backgroundColor: '#282c34', color: '#aaa' }} onChange={(e) => setNumberMonth(e.target.value)} />
                    <input placeholder='R$ 0,00' style={{ border: 'none', padding: '0px 12px', height: 35, width: '100%', backgroundColor: '#282c34', color: '#aaa' }} onChange={(e) => setValuePayment(e.target.value)} />
                    <button disabled={!client || !valuePayment} onClick={() => Payment()} style={{ height: 35, border: 'none', backgroundColor: '#2E7D32', color: '#aaa', padding: '0 18px' }}>Pagar</button>
                </div>
            </div>

            <div style={{marginTop:6}}>
                {registerPayment?.filter((payment) =>
                    payment.userID === paramsID
                ).map((item) => {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <div style={{ display: 'flex', flex: 1, color: '#aaa', fontSize: 12, height: 30, alignItems: 'center' }}>{moment(item.createdAt).format('DD/MM/YY')}</div>
                            <div style={{ display: 'flex', flex: 1, color: '#aaa', fontSize: 12, height: 30, alignItems: 'center' }}>{item.value}</div>
                            <select defaultValue={item.status} onChange={(e) => PutStatusPayment(e, item.id)} style={{background:'#282c34', color:"#aaa", padding:'0 12px'}} >
                                <option>Selecione</option>
                                <option value={'Processando'}>Processando</option>
                                <option value={'Aprovado'}>Aprovado</option>
                                <option value={'Vencido'}>Vencido</option>
                            </select>
                        </div>
                    )
                })}
            </div>

       
        </div>

    )
}