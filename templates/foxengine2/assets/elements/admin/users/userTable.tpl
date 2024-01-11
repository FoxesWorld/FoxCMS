<table class="table table-hover table-striped">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Логин</th>
            <th scope="col">Почта</th>
            <!-- <th scope="col">Дата посещения</th> -->
            <th scope="col">
                <input type="text" onKeyUp="adminPanel.users.parseUsers($(this).val());" class="input" placeholder="Поиск пользователя" required />
            </th>
        </tr>
    </thead>
    <tbody id="usersList"></tbody>
</table>
