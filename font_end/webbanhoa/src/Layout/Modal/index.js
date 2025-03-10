
const Modal = () => {
  return (
    <>
        {/* Button trigger modal */}
        <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalCenter"
        >
            <i class="fa-solid fa-cart-plus"></i>
        </button>
        {/* Modal */}
        <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title text-info" id="exampleModalLongTitle">
                    Giỏ hàng 
                </h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <img className="w-100" src="https://images.pexels.com/photos/759324/pexels-photo-759324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"></img>
                            </div>
                            <div className="col-md-6">
                                <h4 className="text-info">Name : hoa yêu thương</h4>
                                <h4 className="text-info">Price : 999$</h4>
                                <p className="text-info">Detail : 
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora perspiciatis hic, laudantium magni laboriosam accusantium excepturi fuga. Odio blanditiis asperiores, cupiditate praesentium nulla, repudiandae incidunt ea neque sed, reprehenderit illum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">

                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Close
                </button>
                <button type="button" className="btn btn-primary">
                    Buy Now
                </button>
                </div>
            </div>
            </div>
        </div>
        </>

  )
}

export default Modal
