<template>
  <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="text-none" density="compact" v-if="toEdit" 
          v-bind="attrs"
          v-on="on" icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
         
        <v-row justify="end" v-else>  
          
            <v-btn class="text-none mr-10" 
            v-bind="attrs"
            v-on="on"
            >
                Agregar consultorio <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-row>
       
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Clínica</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  label="Nombre de Clínica"
                  v-model="form.name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="form.webpage"
                  label="Pagina Web"
                  required
                  hint="www.miconsultorio.com"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="form.email"
                  type="email"
                  label="Email de clínica"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="form.phone_number"
                  label="Número Telefónico"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-textarea
                v-model="form.address"
                  label="Dirección"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
          class="text-none"
            variant="text"
            @click="deleteCR()"
            :loading="loading"
            v-if="toEdit"
          >
            Eliminar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            class="text-none"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
          class="text-none"
            variant="text"
            @click="editCR()"
            :loading="loading"
            v-if="toEdit"
          >
            Editar
          </v-btn>
          <v-btn
          v-else
          class="text-none"
            variant="text"
            @click="createCR()"
            :loading="loading"
            
          >
            Crear
          </v-btn>
          

        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
    toEdit:Boolean,
    formToEdit:Object
  },
  data:()=>({
    dialog:false,
    consulting_rooms:null,
    loading:false,
    form:{
      id_owner:1,
      webpage:'https://www.clinicashida.com',
      address:'Fake por ahi',
      name:'Una clinica chida',
      email:'mi@email.com',
      phone_number:'5255452172'
    }
  }),
  mounted(){
    if( this.toEdit){
      this.form = this.formToEdit
    }
  },
  methods:{
    ...mapActions(['getConsultingRooms','createConsultingRoom','editConsultingRoom','deleteConsultingRoom']),
    async createCR(){
        this.loading = true
        try {
          await this.createConsultingRoom(this.form)
          this.dialog = false
          this.$emit('getConsulRooms');
          this.loading = false
        } catch (error) {
          console.log(error )
        }
    },
    async editCR(){
      this.loading = true
        try {
          await this.editConsultingRoom({id:this.formToEdit.id,form:this.form})
        this.dialog = false
        this.$emit('getConsulRooms');
        this.loading = false
        } catch (error) {
          console.log(error)
        }
    },
    async deleteCR(){
      this.loading = true
        try {
        await this.deleteConsultingRoom(this.formToEdit.id)
        this.dialog = false
        this.$emit('getConsulRooms');
        this.loading = false
        } catch (error) {
          console.log(error)
        }
    }

  }

}
</script>

<style>

</style>