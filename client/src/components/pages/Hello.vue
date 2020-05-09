<template>
    <div>
        <Header/>
        <div class="hero">
            <div class="hero__inner-container">
                <div class="hero__desc-container">
                    <h1 class="hero__title">
                        Real-Time Dashboard <br> for your business
                    </h1>
                    <div class="hero__subtitle">
                        You can control your finances in this app. For example who makes money and who spends it
                    </div>
                    <div class="hero__buttons">
                        <router-link class="button" to="/login">Get started!</router-link>
                    </div>
                </div>
                <div class="hero__img-container">
                    <img src="../../assets/undraw_investment_data.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '../UI/Header'
    export default {
        name: 'Hello',
        props: {},
        created() {
        },
        components: {
            Header
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .hero {
        padding: 110px 80px 180px;
        &__inner-container {
            max-width: 1261px;
            display: flex;
            -webkit-box-pack: justify;
            justify-content: space-between;
            margin: 0 auto;
        }
        &__desc-container {
            max-width: 510px;
        }
        &__title {
            color: rgb(20, 20, 70);
            font-size: 42px;
            margin-bottom: 30px;
            margin-top: 0;
            line-height: 1.2;
        }
        &__subtitle {
            color: rgb(161, 161, 181);
            font-size: 20px;
            line-height: 30px;
            font-weight: 500;
            font-family: Helvetica, sans-serif;
        }
        &__buttons {
            display: flex;
            margin-top: 45px;
            margin-bottom: 25px;
            -webkit-box-pack: justify;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        &__img-container {
            max-width: 630px;
            img {
                width: 100%;
            }
        }
    }
    .button {
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
        color: white;
        background-color: rgb(255, 100, 146);
        text-decoration: none;
        border-radius: 4px;
        padding: 20px 55px;
        transition: background-color 0.2s linear 0s;
        &:hover {
            background-color: rgb(251, 57, 114);
        }
    }
</style>
