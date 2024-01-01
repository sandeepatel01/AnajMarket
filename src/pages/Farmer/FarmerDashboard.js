import React from "react";
import FarmerMenu from "../../components/Layout/FarmerMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout>
            <div className="container-fluid m-4 p-4 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <FarmerMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h3> Farmer Name : {auth?.user?.name}</h3>
                            <h3> Farmer Email : {auth?.user?.email}</h3>
                            <h3> Farmar Contact : {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;