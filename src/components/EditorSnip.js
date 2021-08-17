import React, { useRef } from 'react';
 import { Editor } from '@tinymce/tinymce-react';
import { eventPropTypes } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/EditorPropTypes';
 
// This displays the tinymce editor to the NewPost form
 export default function EditorSnip(props) {
   const editorRef = useRef(null);


   const log = () => {
     if (editorRef.current) {
       props.handleTextEdit(editorRef.current.getContent());
     }
   };

   return (
     <>
       <Editor
         apiKey='wvjyti8o3yktr4kzsebkpn3035i0d3mf9mt2c3bunadu0at9'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue= ''
         value={props.contentValue}
        //  Value and onEditorChange make this a controlled component that passes the values back to NewPost.js
         onEditorChange={(newValue, editor) => props.handleTextEdit(newValue)}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
     </>
   );
 }