'''
@author: xiaowu
@date: 2022年07月17日10时
说明：

'''
import streamlit as st
# import streamlit.components.v1 as components
# import os

from streamlit_sentence_selector import sentence_selector

string='The classic example of something antifragile is Hydra, the Greek mythological creature with numerous heads, When one is cut off, two grow back in its place, A selector for a list of sentences or strings, and return a list of sentences or strings that you selected.'
strings=string.split(',')
res=sentence_selector(sentences=strings,key = '')
st.write("The selected is:")
st.write(res)