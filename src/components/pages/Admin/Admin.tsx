import Layout from "../../share/Layout/Layout";
import classes from "./Admin.module.css";

function Admin() {

    // useEffect(() => {
    //     const fetchCars = async () => {
    //         const result = await RequestService.GetCars();
    //         setCars(result);
    //     };
    //     fetchCars();
    // }, []);

    // const mapItems = () => cars.map(car => (
    //     <CarCard car={car} />
    // ));


    return (
        <Layout>
            This is the admin!
        </Layout>
    );
}

export default Admin;