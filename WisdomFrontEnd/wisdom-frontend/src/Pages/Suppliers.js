import {useEffect, useState} from "react";


const Suppliers= ()=>{

const[suppliers,setSuppliers] = useState([]);
const [newSuppplier,setNewSupplier] = useState('');
const [imageFile,setImageFile]=useState('');
const [error,setError]=useState('');

useEffect(()=> {

    const fetchSuppliers = async () => {
        try {
            const response = await fetch('http://localhost:8080/suppliers');
            if (!response.ok) throw new Error('Failed to fetch repairs.');

            const data = await response.json();
            setSuppliers(data);
        } catch (err) {
            console.error(err);
            setError("failed to load suppliers")
        }
    };
    fetchSuppliers();
},[]);

return(

    <div className="container m-6 mt-24 ">


<div  className="flex  gap-x-24 w-39 "  >
    {suppliers.map((supplier)=>(
        <div key={supplier.supplierId} className="border-2 w-1/6  ">
          <img src="Assets/a.jpeg"/>
    <p>name : {supplier.name}</p>
    <p>email : {supplier.email}</p>
    <p>contact :{supplier.phone}</p>

        </div>



    ))}

    </div>





</div>





)
};
export default Suppliers;