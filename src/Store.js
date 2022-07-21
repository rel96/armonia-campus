import create from "zustand";

const bookStore = (set) => {
    const [editbookform] = Form.useForm();
    const [addbookform] = Form.useForm();
    const [isCreatingBook, setIsCreatingBook] = useState(false);
    const [isEditingBook, setIsEditingBook] = useState(false);
    const [editingBook, setEditingBook] = useState();
    const [books, setBooks] = useState([]);
}

const userStore = (set) => {
    const [edituserform] = Form.useForm();
    const [adduserform] = Form.useForm();
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [editingUser, setEditingUser] = useState();
    const [users, setUsers] = useState([]);
}