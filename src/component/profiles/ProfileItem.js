import React from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Avatar from 'react-avatar'

const ProfileItem = ({
    profile: {
        user: {_id, name},
            status,
            company,
            location,
            skills
    } }) => {
    return <div className="profile bg-light">
            {/* <img src={avatar} alt="" className="round-img" /> */}
            <Avatar className="round-img" name={name} size="160" textSizeRatio={1.70} />
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="text-pimary" >
                        <i className="fas fas-check"/> {skill}
                    </li>
                ))}
            </ul>
        </div>
} 

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
