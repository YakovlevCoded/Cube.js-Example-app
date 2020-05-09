<template>
    <div class="header">
        <div class="logo">
            <img src="../../assets/logo.svg" alt="Example app logo">
            <span class="logo__text">Example app</span>
        </div>
        <div>
            <a href="https://github.com/YakovlevCoded"
               target="_blank"
               class="header__styled-link">
                <img src="../../assets/git.svg" alt="Check the Code on Github">
                <span>Check the Code on Github</span>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        props: {},
        created() {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .header {
        padding: 54px 80px 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__styled-link {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;

            img {
                margin-right: 15px;
            }
            span {
                color: rgb(67, 67, 107);
            }
        }
    }

    .logo {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        font-size: 32px;
        color: rgb(161, 161, 181);
        text-decoration: none;

        &__text {
            margin-left: 15px;
        }
    }
</style>
