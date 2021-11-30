import React from 'react'

const SingleProductDescription = ({ title, description }) => {
    return (

        <div className="description aalsjwva bg-w-s mt-4">
            <div className="wrapper">
                <div className="title_of_description f-f-san-pro bg p-3">
                    <h3>
                        {`Product details of ${title}`}
                    </h3>
                </div>
                <div className="list_container p-3">
                    <ul className='description-ul' >
                        {description.map((e, i) => {
                            return <li key={i} >{e}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SingleProductDescription
