import { defineStore } from 'pinia'
import { toLower, find, isEmpty } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { AES, enc } from 'crypto-js'
import router from '@/router/index'

export interface IUser {
  id?: string
  userName: string
  password: string
}

export interface IAuthState {
  isAuthenticated: boolean
  userList: IUser[]
  currentUserName: string
}

export interface IAuth extends IAuthState {
  logout: () => void
  loadUser: () => void
  createUser: (user: IUser) => boolean
  login: (user: IUser) => void
}

const secretKey = 'mylearningkey'

const encryptPassword = (password: string): string => AES.encrypt(password, secretKey).toString()
const decryptPassword = (encryptedPassword: string): string =>
  AES.decrypt(encryptedPassword, secretKey).toString(enc.Utf8)

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    isAuthenticated: false,
    userList: [],
    currentUserName: '',
  }),
  actions: {
    loadUser() {
      const json = sessionStorage.getItem('userList') || '[]'
      this.userList = JSON.parse(json)

      const curUser = sessionStorage.getItem('authenticated')
      this.isAuthenticated = !isEmpty(curUser)
      this.currentUserName = curUser || ''
    },
    createUser(user: IUser) {
      user.userName = toLower(user.userName)
      user.password = encryptPassword(user.password)
      user.id = uuidv4()
      this.userList.push(user)

      sessionStorage.setItem('userList', JSON.stringify(this.userList))

      router.push('/login')
    },
    login(user: IUser) {
      const name = toLower(user.userName)
      const userStored = find(this.userList, ({ userName }: IUser) => userName === name)

      if (!isEmpty(userStored) && decryptPassword(userStored.password) === user.password) {
        this.isAuthenticated = true
        this.currentUserName = name
        sessionStorage.setItem('authenticated', name)
        router.push('/')
      }
    },
    logout() {
      this.isAuthenticated = false
      sessionStorage.removeItem('authenticated')
      router.push('/login')
    },
  },
})
