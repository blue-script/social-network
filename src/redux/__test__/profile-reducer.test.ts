import profileReducer, {profileActions} from "../profile-reducer";

const state = {
    posts: [
        {id: 1, message: "Hi, how are you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11}
    ],
    profile: null,
    status: '',
    newPostState: ''
}

it('length of posts should be incremented', () => {
    const action = profileActions.addPostActionCreator('new-post.com')
    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {
    const action = profileActions.addPostActionCreator('new-post.com')
    const newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe('new-post.com')
})

it('after deleting length of messages should be decrement', () => {
    const action = profileActions.deletePost(0)
    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})

it('after deleting length of messages shouldn`t  be decrement if id is incorrect', () => {
    const action = profileActions.deletePost(999)
    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})