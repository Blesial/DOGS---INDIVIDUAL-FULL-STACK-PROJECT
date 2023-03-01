import React from 'react'
import {configure,mount} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom'
import store from './store/index'
import Form from "./components/Form";

configure({adapter: new Adapter()})

describe('DogAdd', () => {
    let wrapper
    beforeEach(()=>{
        wrapper = mount(<Provider store={store}><Form/></Provider>)
    })
    it('deberia tener un <h1>', () => {
        expect(wrapper.find('h1').text()).toEqual('CREATE YOUR OWN RAZE:  ')
    })
    it('deberia tener un form',()=>{
        expect(wrapper.find('form'))
    })
    it('deberia tener un input con name heightMax', ()=>{
        expect(wrapper.find('input[name="heightMin"]')).toHaveLength(1)
    })
    it('deberia tener un input con name heightMax', ()=>{
        expect(wrapper.find('input[name="heightMax"]')).toHaveLength(1)
    })
    it('deberia tener un input con name weightMin', ()=>{
        expect(wrapper.find('input[name="weightMin"]')).toHaveLength(1)
    })
    it('deberia tener un input con name weightMax', ()=>{
        expect(wrapper.find('input[name="weightMax"]')).toHaveLength(1)
    })
    it('deberia tener un select para los temperamentos', ()=>{
        expect(wrapper.find('select')).toHaveLength(1)
    })
    it('deberia tener un input con name lifeSpanMin', ()=>{
        expect(wrapper.find('input[name="lifeSpanMin"]')).toHaveLength(1)
    })
    it('deberia tener un input con name lifeSpanMax', ()=>{
        expect(wrapper.find('input[name="lifeSpanMax"]')).toHaveLength(1)
    })
    it('deberia tener un button para enviar con type submit', ()=>{
        expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
    })
})