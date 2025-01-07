<div class="card-body px-0" id="perms">
               <div class="table-responsive">
			   <form id="permissionsForm" method="POST" action="/" autocomplete="false">
                  <table id="perm-list-table" class="table table-hover table-striped" data-bs-toggle="data-table">
                     <thead>
                        <tr class="ligth">
						   <th>№</th>
                           <th>Имя группы</th>
                           <th>Имя права</th>
                            <th scope="col">Значение</th>
                        </tr>
                     </thead>
                     <tbody id="permList">
                     </tbody>
                  </table>

			<input type="hidden" name="admPanel" value="editPermissions" />
						<input name="refreshPage" type="hidden" value="false" />
						<input name="playSound" type="hidden" value="false" />
				<button type="submit" class="login">Apply</button>
			</form>
               </div>
            </div>