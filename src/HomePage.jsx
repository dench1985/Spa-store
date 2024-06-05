import { useEffect, useState } from "react";
import { HOST } from "./App";
import { LogOut } from "./LogOut";
import { Button, TextField } from "@mui/material";

export function HomePage(params) {

    const [data, setData] = useState(null)

    useEffect(() => {

        fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/get`, {
            headers: {
                "x-auth": localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then((data) => {
                setData(data.data)
            })

    }, [])

    return <>

        <header>
            <div>HOME PAGE </div>
            <LogOut />
        </header>
        <br></br>
        <br></br>


        <main>
            {data == null ? (
                <div>Loding...</div>
            ) : (
                <>

                    <TableComponent data={data} setData={setData} />

                </>

            )}
        </main>

    </>

}

function TableComponent({ data, setData }) {
    async function deleteItem(id) {
        await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
            {
                method: "POST",
                headers: {
                    "x-auth": localStorage.getItem('token',)
                },
            },
        );
        setData(data.filter(x => x.id !== id));
    }


    async function addnew(event) {
        event.preventDefault();

        const companySignatureName = event.target.companySignatureName.value;
        const documentName = event.target.documentName.value;
        const documentStatus = event.target.documentStatus.value;
        const documentType = event.target.documentType.value;
        const employeeNumber = event.target.employeeNumber.value;
        const employeeSignatureName = event.target.employeeSignatureName.value;

        const data = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-auth": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    companySignatureName, documentName, documentStatus,
                    documentType, employeeNumber, employeeSignatureName,
                    companySigDate: new Date(),
                    employeeSigDate: new Date(),
                })
            },


        ).then(response => response.json())
        setData((org_data) => org_data.concat(data.data))
        event.target.reset()
    }

    async function updeteFields(event) {
        event.preventDefault();
        const companySignatureName = event.target.companySignatureName.value;
        const documentName = event.target.documentName.value;
        const documentStatus = event.target.documentStatus.value;
        const documentType = event.target.documentType.value;
        const employeeNumber = event.target.employeeNumber.value;
        const employeeSignatureName = event.target.employeeSignatureName.value;

        const companySigDate = event.target.companySigDate.value;
        const employeeSigDate = event.target.employeeSigDate.value;
        const data = await fetch(`${HOST}/ru/data/v3/testmethods/docs/userdocs/set/${event.target.id}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "x-auth": localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    companySignatureName, documentName, documentStatus,
                    documentType, employeeNumber, employeeSignatureName,
                    companySigDate, employeeSigDate
                })

            }

        )

            .then(x => x.json())
        console.log(data);

    }

    return (
        <div className="table">

            <div className="tbody">
                {data.map((item) => (
                    <form key={item.id} id={item.id} onSubmit={updeteFields}>

                        <div>
                            <TextField label="companySigDate" variant="outlined" name="companySigDate" defaultValue={item.companySigDate} readOnly />

                        </div>
                        <div>
                            <TextField label="companySignatureName" variant="outlined" name="companySignatureName" defaultValue={item.companySignatureName} />

                        </div>
                        <div>
                            <TextField label="documentName" variant="outlined" name="documentName" defaultValue={item.documentName} />

                        </div>
                        <div>
                            <TextField label="documentStatus" variant="outlined" name="documentStatus" defaultValue={item.documentStatus} />

                        </div>
                        <div>
                            <TextField label="documentType" variant="outlined" name="documentType" defaultValue={item.documentType} />

                        </div>
                        <div>
                            <TextField label="employeeNumber" variant="outlined" name="employeeNumber" defaultValue={item.employeeNumber} />

                        </div>
                        <div>
                            <TextField label="employeeSigDate" variant="outlined" name="employeeSigDate" defaultValue={item.employeeSigDate} readOnly />


                        </div>
                        <div>
                            <TextField label="employeeSignatureName" variant="outlined" name="employeeSigDate" defaultValue={item.employeeSignatureName} />

                        </div>
                        <div>
                            <Button
                                type="button"
                                onClick={() => deleteItem(item.id)}
                                variant="outlined"
                                color="error"
                            >
                                delete item
                            </Button>
                        </div>
                        <div>
                            <Button variant="contained">Updete</Button>
                        </div>
                    </form>
                ))}

                <form onSubmit={addnew}>

                    <div>
                        <TextField label="companySigDate" variant="outlined" disabled name="companySigDate" />
                    </div>
                    <div>

                        <TextField label="companySignatureName" variant="outlined" name="companySignatureName" />
                    </div>
                    <div>
                        <TextField label="documentName" variant="outlined" name="documentName" />
                    </div>
                    <div>
                        <TextField label="documentStatus" variant="outlined" name="documentStatus" />
                    </div>
                    <div>
                        <TextField label="documentType" variant="outlined" name="documentType" />
                    </div>
                    <div>
                        <TextField label="employeeNumber" variant="outlined" name="employeeNumber" />
                    </div>
                    <div>
                        <TextField label="employeeSigDate" variant="outlined" name="employeeSigDate" disabled />
                    </div>
                    <div>
                        <TextField label="employeeSignatureName" variant="outlined" name="employeeSignatureName" />
                    </div>
                    <div>

                        <Button type="submit" variant="contained">create</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}



