import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowListStore } from "../redux/GeneralSlice";

export default function ListStoreControllers(props){
  const dispatch = useDispatch()
  const showListStore = useSelector(state => state.general.showListStore)

  return <>
    <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasStore" aria-controls="offcanvasStore" type='button' className='btn btn-primary d-flex justify-content-center align-items-center position-absolute start-0 bottom-0' style={{borderRadius:"15px",marginBottom:"20px",marginLeft:"20px"}}>
      <span className="material-symbols-outlined me-2" style={{fontSize:"22px"}}>
        list
      </span>
      <span className='fw-bold' style={{fontSize:"15px"}}>Danh sách của hàng</span>
    </button>
    <div className="offcanvas offcanvas-start" data-bs-backdrop="static" id="offcanvasStore" aria-labelledby="offcanvasStoreLabel">
      <div className="offcanvas-header">
        <h3 className="offcanvas-title fw-bold" id="offcanvasStoreLabel" style={{color:"#91298c"}}>Klever Fruits</h3>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body d-flex flex-column justify-content-between align-items-center">
        <div>
          <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${showListStore==='all'?'btn-primary':'btn-outline-secondary'} w-100 mb-2`} disabled={showListStore==='all'} onClick={()=>dispatch(setShowListStore('all'))}>
            Hiển thị toàn bộ danh sách của hàng
          </button>
          <span className="text-secondary fw-bold">Hiển thị theo từng khu vực:</span>
          <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${showListStore==='Hai Bà Trưng'?'btn-primary':'btn-outline-secondary'} w-100 mt-2`} disabled={showListStore==='Hai Bà Trưng'} onClick={()=>dispatch(setShowListStore('Hai Bà Trưng'))}>
            Quận Hai Bà Trưng
          </button>
          <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${showListStore==='Thanh Xuân'?'btn-primary':'btn-outline-secondary'} w-100 mt-2`} disabled={showListStore==='Thanh Xuân'} onClick={()=>dispatch(setShowListStore('Thanh Xuân'))}>
            Quận Thanh Xuân
          </button>
          <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${showListStore==='Đống Đa'?'btn-primary':'btn-outline-secondary'} w-100 mt-2`} disabled={showListStore==='Đống Đa'} onClick={()=>dispatch(setShowListStore('Đống Đa'))}>
            Quận Đống Đa
          </button>
          <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${showListStore==='Cầu Giấy'?'btn-primary':'btn-outline-secondary'} w-100 mt-2`} disabled={showListStore==='Cầu Giấy'} onClick={()=>dispatch(setShowListStore('Cầu Giấy'))}>
            Quận Cầu Giấy
          </button>
          <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${showListStore==='Ba Đình'?'btn-primary':'btn-outline-secondary'} w-100 mt-2`} disabled={showListStore==='Ba Đình'} onClick={()=>dispatch(setShowListStore('Ba Đình'))}>
            Quận Ba Đình
          </button>
          <button data-bs-dismiss="offcanvas" aria-label="Close" className={`btn ${showListStore==='Hoàn Kiếm'?'btn-primary':'btn-outline-secondary'} w-100 mt-2`} disabled={showListStore==='Hoàn Kiếm'} onClick={()=>dispatch(setShowListStore('Hoàn Kiếm'))}>
            Quận Hoàn Kiếm
          </button>
        </div>
        {
          showListStore && <button className={`btn btn-danger w-100 mt-4`} onClick={()=>dispatch(setShowListStore(false))} data-bs-dismiss="offcanvas" aria-label="Close">
            Ẩn cửa hàng 
          </button>
        }
      </div>
    </div>
  </>
}