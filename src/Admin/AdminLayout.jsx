import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({children}){
    return(
        <div style={{display:"flex"}}>
           <AdminSidebar/>
            <div style={{marginLeft:"220px",padding:"20px",width:"100%"}}>
                {children}
            </div>
        </div>
    )
}