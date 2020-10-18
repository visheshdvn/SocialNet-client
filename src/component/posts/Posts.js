import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import { getPosts, updatePosts } from '../../actions/post'
import PostForm from './PostForm'
import openSocket from 'socket.io-client'

const Posts = ({getPosts, updatePosts, post: {posts, loading}}) => {
    
    useEffect(() => {
        const socket = openSocket('https://socialnetworkbackend.herokuapp.com')
        socket.on('posts', data => {
            if (data.action === "create") {
                updatePosts(data.post)
            }
        })
        getPosts()
    }, [getPosts, updatePosts])

    return loading ? <Spinner /> : (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community
            </p>
            <PostForm />
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    updatePosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts, updatePosts})(Posts)