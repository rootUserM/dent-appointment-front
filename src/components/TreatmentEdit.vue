<template>
    <v-dialog v-model="dialogVisible" max-width="600px" @input="handleCloseDialog" persistent>
    <v-card >
      <h1 class="pt-5">Nota de evolución de {{ patient.Name }}</h1>
      
        <v-card-text>
          <v-container>
            <v-col cols="12" class="comment-scolled">
            
              <v-col cols="12">
            <v-simple-table dense v-if="dataComponent" > 
                <tbody>
                    <tr>
                        <td width="200px"><b>Fecha de registro</b></td>
                        <td>{{dataComponent.date}}</td>
                    </tr>
                    <tr>
                        <td width="200px"><b>Servicio relacionado</b></td>
                        <td>{{ (services.find(x => dataComponent.id_service == x.id) || {}).name }}</td>
                    </tr>
                    <tr>
                        <td width="200px"><b>Nota de registro</b></td>
                        <td>{{dataComponent.note}}</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </v-col>
              <div class="mb-10">
                <v-row justify="center" v-if="!this.dataComponent.payment_info.total_debt == 0">
                  
                    <v-col cols="6">
                    <v-form ref="form">
                    <v-text-field
                      label="Añadir pago"
                      required
                      v-model="payment_form.contribution"
                      hint="Registra el pago que hizo el px"
                      outlined
                      shaped
                      density="compact"
                      :rules="[priceRules]"
                    ></v-text-field>
                </v-form>
                  </v-col>
                  <v-col cols="6">
                    <v-btn @click="createPaymentFunc()" icon
                      ><v-icon>mdi-plus</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
                <div v-else class="mt-5 mb-5">
                    El tratamiento fue liquidado
                  </div>
                <v-row v-if="dataComponent">
                  <v-data-table
                    :headers="payment_headers"
                    :items="dataComponent.payment_info.payments_list"
                    :items-per-page="5"
                    class="elevation-1"
                  >
                  </v-data-table>
                </v-row>
              </div>
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="text-none"
            color="blue darken-1"
            text
            @click="closeDialog()"
          >
            Cerrar
          </v-btn>
          
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    showDialog:Boolean, 
    currentData:Object,
    patient:Object,
    services:Array
  },
  data: () => ({
    dialogVisible: false,
    loading: false,
    neededPrice:0,
    treatment_form: {
      id_service: null,
      id_patient: null,
      id_consultingRoom: null,
      date: null,
      note: "",
      payment: 0.0,
    },
    payment_form: {
      contribution: 0.0,
      id_consultingRoom: "",
      id_treatment: "",
    },
    payment_headers:[
    { text: 'Fecha de pago', value: 'date_created' },
    { text: 'Monto aportado', value: 'contribution' },
    ],
    dataComponent:{
      payment_info:{
        total_debt:0
      },
            date:'',
            note:'',
    },
  }), 
  methods: {
    ...mapActions([
      "createPayment",
    ]), 
    handleCloseDialog(){
      this.dataComponent = {
      payment_info:{},
            date:'',
            note:'',
    }
      this.$emit('closeDialog')

    },
    closeDialog(){
      this.$emit('closeDialog')
    },
    async createPaymentFunc() {
        try {
        this.payment_form.id_consultingRoom =  this.currentData.service_info.id_consultingRoom;
        this.payment_form.id_treatment =  this.currentData.id;
        this.payment_form.contribution = parseFloat(this.payment_form.contribution);
        let result = await this.createPayment(this.payment_form);
        this.dataComponent.payment_info.payments_list =result.data
        this.$refs.form.reset();
        this.$emit("getTreatments");
        } catch (error) {
         console.log(error) 
        }
      this.loading = false;
    },
  },
  watch: {
    showDialog(newVal) {
      this.dialogVisible = newVal;
    },
    currentData(newVal){
      this.dataComponent = newVal
    },
  },
  computed:{
    priceRules() {
  try {
    let obj = this.dataComponent;
    return (value) => {
      if (!value || isNaN(value) || parseFloat(value) > (obj ? obj.payment_info.total_debt : 0)) {
        return 'El monto no debe exceder los ' + (obj ? obj.payment_info.total_debt : 0);
      }
      return true;
    };
  } catch (error) {
    return false;
  }
}

  }
};
</script>

<style>

</style>