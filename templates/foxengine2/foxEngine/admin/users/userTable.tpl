<!-- <table class="table table-hover table-striped">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Логин</th>
            <th scope="col">Почта</th>
            <th scope="col">Дата посещения</th> 
            <th scope="col">
                <input type="text" onKeyUp="adminPanel.users.parseUsers($(this).val());" class="input" placeholder="Поиск пользователя" required />
            </th>
        </tr>
    </thead>
    <tbody id="usersList"></tbody>
</table>
-->

<div class="card-body px-0">
               <div class="table-responsive">
                  <table id="user-list-table" class="table table-hover table-striped" data-bs-toggle="data-table">
                     <thead>
                        <tr class="ligth">
						   <th>№</th>
                           <th>Аватар</th>
                           <th>Логин</th>
                           <!-- <th>E-mail</th> -->
                            <th scope="col">
								<input type="text" onKeyUp="adminPanel.users.parseUsers($(this).val());" class="input" placeholder="Поиск пользователя" required />
							</th>
                        </tr>
                     </thead>
                     <tbody id="usersList">
                     </tbody>
                  </table>
               </div>
            </div>
